import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SortTypeEnum } from "src/constants/constants";
import { AppException } from "src/core/exceptions";
import { InspectorEntity, RoleEntity, UserEntity, UserRoleEntity } from "src/entities";
import { ErrorCode } from "src/enums";
import { Paginate, Password } from "src/utils";
import { Brackets, DataSource, In, Repository } from "typeorm";
import { CreateUserDto } from "./dto/createDto";
import { GetListUserDto } from "./dto/filterDto";
import { UpdateUserDto } from "./dto/updateDto";
import { IAuth } from "src/core/interface";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserRoleEntity) private readonly userRoleRepository: Repository<UserRoleEntity>,
    @InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(InspectorEntity) private readonly inspectorRepository: Repository<InspectorEntity>,
    private readonly myDataSource: DataSource,
  ) {}

  /**
   * @author tronghieucn4.ptit@gmail.com
   * @functionName create
   * @param id
   * @description create user master id
   */

  public async create(auth: IAuth, createUserDto: CreateUserDto): Promise<any> {
    const {
      userType: user_type_code,
      password,
      firstNameKanji: firstname,
      lastNameKanji: lastname,
      firstNameKana: firstname_kana,
      lastNameKana: lastname_kana,
      firstNameEn: firstname_en,
      lastNameEn: lastname_en,
      companyCode: company_code,
      inspectorFlag: inspector_flag,
      email,
      roles,
    } = createUserDto;

    const queryRunner = this.myDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const usersRepository = queryRunner.manager.getRepository(UserEntity);
    const rolesRepository = queryRunner.manager.getRepository(RoleEntity);
    const userRolesRepository = queryRunner.manager.getRepository(UserRoleEntity);

    try {
      const checkEmailExists = await usersRepository
        .createQueryBuilder("user", queryRunner)
        .where("user.email = :email", { email: email.trim() })
        .getOne();

      if (checkEmailExists) {
        throw new AppException(ErrorCode.E102002, {
          cause: new Error(),
          description: "Email has already exists",
        });
      }

      const newUser = await queryRunner.manager.save(UserEntity, {
        firstname,
        lastname,
        firstname_kana,
        lastname_kana,
        firstname_en,
        lastname_en,
        email,
        inspector_flag,
        company_code,
        user_type_code,
        created_by: auth.id,
        password: await Password.hash(password),
      });

      const existingRoles = await rolesRepository.find({
        where: {
          id: In(roles),
        },
      });

      const existingIds = existingRoles.map((role) => role.id);
      const missingIds = roles.filter((id) => !existingIds.includes(id));

      if (missingIds.length > 0) {
        throw new AppException(ErrorCode.E102002, {
          cause: new Error(),
          description: `Role Id ${missingIds} invalid`,
        });
      }

      const newUserRoles = roles.map((id) => ({
        user_id: newUser.id,
        role_id: id,
      }));

      await userRolesRepository
        .createQueryBuilder(`user_role`, queryRunner)
        .insert()
        .into(UserRoleEntity)
        .values(newUserRoles)
        .execute();

      inspector_flag == 1
        ? await this.inspectorRepository.save(
            this.inspectorRepository.create({ user_id: newUser.id, created_by: auth.id, updated_by: auth.id }),
          )
        : null;

      await queryRunner.commitTransaction();
      return newUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @author tronghieucn4.ptit@gmail.com
   * @functionName findAll
   * @param id
   * @description get list user master id
   */
  public async filter(query: GetListUserDto): Promise<Paginate> {
    const {
      userId,
      lastName,
      firstName,
      email,
      userType,
      sortField = "created_at",
      sortType = SortTypeEnum.ASC,
      page = 1,
      limit = 10,
    } = query;

    const userQuery = this.userRepository.createQueryBuilder("user").where(`user.deleted_at is NULL`);

    if (userId) {
      userQuery.andWhere(`user.id = :userId`, { userId: userId });
    }

    if (lastName) {
      userQuery.andWhere(
        new Brackets((q) => {
          q.orWhere(`user.lastname LIKE :lastname`, { lastname: `%${lastName}%` });
          q.orWhere(`user.lastname_kana LIKE :lastname`, { lastname: `%${lastName}%` });
          q.orWhere(`user.lastname_en LIKE :lastname`, { lastname: `%${lastName}%` });
        }),
      );
    }

    if (firstName) {
      userQuery.andWhere(
        new Brackets((q) => {
          q.orWhere(`user.firstname LIKE :firstname`, { firstname: `%${firstName}%` });
          q.orWhere(`user.firstname_kana LIKE :firstname`, { firstname: `%${firstName}%` });
          q.orWhere(`user.firstname_en LIKE :firstname`, { firstname: `%${firstName}%` });
        }),
      );
    }

    if (email) {
      userQuery.andWhere(`user.email = :email`, { email: email });
    }

    if (userType) {
      userQuery.andWhere(`user.user_type_code = :userType`, { userType: userType });
    }

    const [list, total] = await Promise.all([
      userQuery
        .orderBy(`user.${sortField}`, sortType)
        .skip((page - 1) * limit)
        .take(limit)
        .getMany(),
      userQuery.getCount(),
    ]);

    return new Paginate(list, total, page, limit);
  }

  /**
   * @author tronghieucn4.ptit@gmail.com
   * @functionName findOne
   * @param id
   * @description get detail user master id
   */

  public async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.createQueryBuilder("user").where("user.id = :id", { id: id }).getOne();
    if (!user)
      throw new NotFoundException(ErrorCode.E102000, {
        cause: new Error(),
        description: "User does not exists",
      });
    return user;
  }

  /**
   * @author tronghieucn4.ptit@gmail.com
   * @functionName update
   * @param id
   * @description
   */

  public async update(auth: IAuth, id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const {
      userType: user_type_code,
      password,
      firstNameKanji: firstname,
      lastNameKanji: lastname,
      firstNameKana: firstname_kana,
      lastNameKana: lastname_kana,
      firstNameEn: firstname_en,
      lastNameEn: lastname_en,
      companyCode: company_code,
      inspectorFlag: inspector_flag,
      email,
    } = updateUserDto;

    const { id: userId } = auth;

    const checkEmailExists = await this.userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .andWhere("user.id != :id", { id: id })
      .getOne();

    if (checkEmailExists) {
      throw new AppException(ErrorCode.E102002, {
        cause: new Error(),
        description: "Email has already exists",
      });
    }

    const updatedUser = await this.userRepository
      .createQueryBuilder("user")
      .update(UserEntity)
      .set({
        user_type_code,
        password,
        firstname,
        lastname,
        firstname_kana,
        lastname_kana,
        firstname_en,
        lastname_en,
        company_code,
        inspector_flag,
        email,
        updated_by: userId,
      })
      .where("id = :id", { id: id })
      .returning("*")
      .execute();

    const result: UserEntity = updatedUser.raw[0] as UserEntity;
    return result;
  }

  /**
   * @author tronghieucn4.ptit@gmail.com
   * @functionName remove
   * @param id
   * @description delete user master id
   */

  public async remove(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(ErrorCode.E102000, {
        cause: new Error(),
        description: "User does not exists",
      });
    }

    return await this.userRepository.softDelete({ id: id });
  }
}
