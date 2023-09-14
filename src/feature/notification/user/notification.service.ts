import * as moment from "moment";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginateReq } from "src/core/decorators";
import { AppException } from "src/core/exceptions";
import { IAuth } from "src/core/interface";
import { NotificationUserEntity, NotificationEntity, UserEntity } from "src/entities";
import { ErrorCode } from "src/enums";
import { Brackets, DataSource, Not, Repository } from "typeorm";
import { Paginate } from "src/utils";
import { NotificationUserDto } from "./notification.dto";
import { CreateNotificationDto } from "./dto/createDto";
import { GetListNotificationsDto } from "./dto/filterDto";
import { SortTypeEnum } from "src/constants";
import { TargetUsersDto, UpdateNotificationDto } from "./dto/updateDto";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity) private readonly notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(NotificationUserEntity)
    private readonly notificationUserRepository: Repository<NotificationUserEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly myDataSource: DataSource,
  ) {}

  public async filterME(auth: IAuth, paginateReq: IPaginateReq): Promise<Paginate> {
    const take = paginateReq.size * paginateReq.page;
    const [notificationUsers, total] = await this.notificationUserRepository
      .createQueryBuilder("noti-user")
      .where("noti-user.recipient_id = :recipient_id", { recipient_id: auth.id })
      .orWhere("noti-user.sender_id = :sender_id", { sender_id: auth.id })
      .setFindOptions({
        take: take,
        skip: take - paginateReq.size,
      })
      .getManyAndCount();

    const notificationIds = new Set<number>();
    const userIds = new Set<number>();
    for (const item of notificationUsers) {
      notificationIds.add(item.notification_id);
      userIds.add(item.sender_id);
      userIds.add(item.recipient_id);
    }
    const [notifications, users] = await Promise.all([
      this.getNotificationByIds(Array.from(notificationIds)),
      this.getUsersByIds(Array.from(userIds)),
    ]);

    const result = notificationUsers.map((item) => {
      return {
        ...item,
        recipient: users.find((user) => user.id === item.recipient_id),
        sender: users.find((user) => user.id === item.sender_id),
        notification: notifications.find((noti) => noti.id === item.notification_id),
      };
    });

    return new Paginate(NotificationUserDto.plainToInstance(result), total, paginateReq.page, paginateReq.size);
  }

  private async getNotificationByIds(ids: number[]): Promise<NotificationEntity[]> {
    if (ids.length === 0) return [];
    //TODO: load cache
    const notifications = await this.notificationRepository
      .createQueryBuilder("noti")
      .where("noti.id IN (:...ids)", { ids: ids })
      .getMany();
    if (notifications.length !== ids.length) throw new AppException(ErrorCode.E303000);
    return notifications;
  }

  private async getUsersByIds(ids: number[]): Promise<UserEntity[]> {
    if (ids.length === 0) return [];
    //TODO: load cache
    const users = await this.userRepository
      .createQueryBuilder("user")
      .where("user.id IN (:...ids)", { ids: ids })
      .getMany();
    if (users.length !== ids.length) throw new AppException(ErrorCode.E102000);
    return users;
  }

  public async create(auth: IAuth, createNotificationDto: CreateNotificationDto): Promise<NotificationEntity> {
    const { targetUsers, title, content, releaseFrom, releaseTo, isImportant } = createNotificationDto;
    const { id: userId, company_code } = auth;

    const queryRunner = this.myDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const usersRepository = queryRunner.manager.getRepository(UserEntity);

    try {
      // validate target users
      const validateTargetUsers = await usersRepository
        .createQueryBuilder("user", queryRunner)
        .where("user.id IN (:...ids)", { ids: targetUsers })
        .andWhere("user.deleted_at IS NULL")
        .getMany();

      if (validateTargetUsers.length !== targetUsers.length) {
        throw new AppException(ErrorCode.E102000, {
          cause: new Error(),
          description: `Some users do not exist or have not been marked as deleted.`,
        });
      }

      const notification = new NotificationEntity();
      notification.company_code = company_code;
      notification.title = title;
      notification.body = content;
      notification.release_from = releaseFrom.toString();
      notification.release_to = releaseTo.toString();
      notification.important_flag = isImportant;
      notification.created_by = userId;

      const newNotification = await queryRunner.manager.save(NotificationEntity, notification);

      const insertedNotificationUser = targetUsers.map((id) => {
        const notificationUser = new NotificationUserEntity();
        notificationUser.notification_id = newNotification.id;
        notificationUser.sender_id = userId;
        notificationUser.recipient_id = id;
        notificationUser.created_by = userId;

        return notificationUser;
      });

      await queryRunner.manager.save(NotificationUserEntity, insertedNotificationUser);

      await queryRunner.commitTransaction();

      return newNotification;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async filter(query: GetListNotificationsDto, pagination: IPaginateReq): Promise<Paginate> {
    const {
      title,
      author,
      targetUsers,
      fromReleasedDate,
      toReleasedDate,
      importantFlag,
      sortField = "created_at",
      sortType = SortTypeEnum.ASC,
    } = query;

    const { page, size } = pagination;

    console.log("query", query);
    const notification = await this.notificationRepository
      .createQueryBuilder("notification")
      .leftJoinAndSelect("notification.notificationUsers", "notificationUsers")
      .leftJoinAndSelect("notificationUsers.user", "targetUsers")
      .leftJoinAndSelect("notification.user", "user");

    if (title) {
      notification.andWhere(`LOWER(notification.title) LIKE :title`, {
        title: `%${title}%`,
      });
    }

    if (author) {
      notification.andWhere(
        new Brackets((q) => {
          q.orWhere(`CONCAT(LOWER(user.firstname), ' ', LOWER(user.lastname)) LIKE :author`, { author: `%${author}%` });
        }),
      );
    }

    // release_at
    if (fromReleasedDate && moment(fromReleasedDate).isValid() && !toReleasedDate) {
      notification.andWhere(`(notification.release_from >= '${moment(fromReleasedDate).startOf("day").format()}')`);
    }

    if (toReleasedDate && moment(toReleasedDate).isValid() && !fromReleasedDate) {
      notification.andWhere(`(notification.release_to <= '${moment(toReleasedDate).endOf("day").format()}')`);
    }

    if (fromReleasedDate && toReleasedDate && moment(fromReleasedDate).isValid() && moment(toReleasedDate).isValid()) {
      notification.andWhere(
        new Brackets((q) => {
          q.andWhere(`(notification.release_from >= '${moment(fromReleasedDate).startOf("day").format()}')`);
          q.andWhere(`(notification.release_to <= '${moment(toReleasedDate).endOf("day").format()}')`);
        }),
      );
    }

    if (targetUsers) {
      notification.andWhere(
        new Brackets((q) => {
          q.orWhere(`CONCAT(LOWER(targetUsers.firstname), ' ', LOWER(targetUsers.lastname)) LIKE :targetUser`, {
            targetUser: `%${targetUsers}%`,
          });
        }),
      );
    }

    if (importantFlag) {
      notification.andWhere("notification.important_flag = :importantFlag", { importantFlag: importantFlag });
    }

    const [list, total] = await Promise.all([
      notification
        .orderBy(`notification.${sortField}`, sortType)
        .skip((page - 1) * size)
        .take(size)
        .getMany(),
      notification.getCount(),
    ]);

    return new Paginate(list, total, page, size);
  }

  public async findOne(id: number): Promise<NotificationEntity> {
    const notification = await this.notificationRepository
      .createQueryBuilder("notification")
      .where("notification.id = :id", { id: id })
      .leftJoinAndSelect("notification.notificationUsers", "notificationUsers")
      .leftJoinAndSelect("notification.user", "user")
      .getOne();
    if (!notification)
      throw new NotFoundException(ErrorCode.E303000, {
        cause: new Error(),
        description: "Notification does not exists",
      });
    return notification;
  }

  public async update(
    auth: IAuth,
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<NotificationEntity> {
    const { targetUsers, title, content, releaseFrom, releaseTo, isImportant } = updateNotificationDto;
    const { id: userId, company_code } = auth;

    const queryRunner = this.myDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const notificationsRepository = queryRunner.manager.getRepository(NotificationEntity);
    const notificationUserRepository = queryRunner.manager.getRepository(NotificationUserEntity);

    try {
      const notification = await notificationsRepository.findOne({ where: { id: id } });
      if (!notification) {
        throw new AppException(ErrorCode.E303000, {
          cause: new Error(),
          description: `Notification does not exists`,
        });
      }

      notification.company_code = company_code;
      notification.title = title;
      notification.body = content;
      notification.release_from = releaseFrom.toString();
      notification.release_to = releaseTo.toString();
      notification.important_flag = isImportant;
      notification.updated_by = userId;

      const result = await notificationsRepository.save(notification);

      const targetUser = targetUsers.map(async (data: TargetUsersDto) => {
        const { notificationUserId, recipientId } = data;

        // validate notification_user_id
        const notificationUser = await this.notificationUserRepository.findOne({
          where: { id: notificationUserId, notification_id: id },
        });
        if (!notificationUser) {
          throw new AppException(ErrorCode.E304000, {
            cause: new Error(),
            description: `Notification User does not exists`,
          });
        }

        // validate user
        const user = await this.userRepository.findOne({ where: { id: recipientId } });
        if (!user) {
          throw new AppException(ErrorCode.E102000, {
            cause: new Error(),
            description: `User does not exists`,
          });
        }

        // update recipient_id and updated_by
        await notificationUserRepository
          .createQueryBuilder("notificationUser", queryRunner)
          .update(NotificationUserEntity)
          .set({ recipient_id: recipientId, updated_by: userId })
          .where("id = :id AND notification_id = :notificationId", { id: notificationUserId, notificationId: id })
          .execute();
      });

      await Promise.all(targetUser);

      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
