import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import { SortTypeEnum } from "src/constants/constants";
import { IPaginateReq } from "src/core/decorators";
import { AppException } from "src/core/exceptions";
import { IAuth } from "src/core/interface";
import { MailTemplateEntity, MstProgramEntity } from "src/entities";
import { ErrorCode } from "src/enums";
import { Paginate } from "src/utils";
import { Brackets, DataSource, Not, Repository, UpdateResult } from "typeorm";
import { CreateMailTemplateDto, Recipient } from "./dto/createDto";
import { GetListMailTemplateDto } from "./dto/filterDto";
import { UpdateMailTemplateDto } from "./dto/updateDto";

@Injectable()
export class MailTemplatesService {
  constructor(
    @InjectRepository(MailTemplateEntity) private readonly mailTemplateRepository: Repository<MailTemplateEntity>,
    @InjectRepository(MstProgramEntity) private readonly mstProgramRepository: Repository<MstProgramEntity>,
    private readonly myDataSource: DataSource,
  ) {}

  public async create(auth: IAuth, createMailTemplateDto: CreateMailTemplateDto): Promise<MailTemplateEntity> {
    // check program exists -> continue ....
    const object = this.processInputMailTemplate(auth, createMailTemplateDto);
    return await this.mailTemplateRepository.save(object);
  }

  public async filter(query: GetListMailTemplateDto, pagination: IPaginateReq): Promise<Paginate> {
    const {
      programName,
      templateName,
      author,
      defaultFlag,
      fromCreatedDate,
      toCreatedDate,
      fromUpdatedDate,
      toUpdatedDate,
      sortField = "created_at",
      sortType = SortTypeEnum.ASC,
    } = query;
    const { page, size } = pagination;

    const mailTemplateQuery = await this.mailTemplateRepository
      .createQueryBuilder("mail_templates")
      .where(`mail_templates.deleted_at is NULL`)
      .leftJoinAndSelect("mail_templates.user", "user")
      .leftJoinAndSelect("mail_templates.mstProgram", "mstProgram");

    // continue ...
    if (programName) {
      mailTemplateQuery.andWhere(`LOWER(mail_templates.program_name) LIKE :programName`, {
        programName: `%${programName}%`,
      });
    }

    if (defaultFlag) {
      mailTemplateQuery.andWhere(`mail_templates.default_flag = :defaultFlag`, { defaultFlag: 1 });
    }

    if (templateName) {
      mailTemplateQuery.andWhere(`LOWER(mail_templates.name) LIKE :name`, { name: `%${templateName}%` });
    }

    if (author) {
      mailTemplateQuery.andWhere(
        new Brackets((q) => {
          q.orWhere(`CONCAT(LOWER(user.firstname), ' ', LOWER(user.lastname)) LIKE :author`, { author: `%${author}%` });
          // q.orWhere(`CONCAT(LOWER(user.firstname_kana), ' ', LOWER(user.lastname_kana)) LIKE :author`, {
          //   author: `%${author}%`,
          // });
          // q.orWhere(`CONCAT(LOWER(user.firstname_en), ' ', LOWER(user.lastname_en)) LIKE :author`, {
          //   author: `%${author}%`,
          // });
        }),
      );
    }

    // created_at
    if (fromCreatedDate && moment(fromCreatedDate).isValid() && !toCreatedDate) {
      mailTemplateQuery.andWhere(`(mail_templates.created_at >= '${moment(fromCreatedDate).startOf("day").format()}')`);
    }

    if (toCreatedDate && moment(toCreatedDate).isValid() && !fromCreatedDate) {
      mailTemplateQuery.andWhere(`(mail_templates.created_at <= '${moment(toCreatedDate).endOf("day").format()}')`);
    }

    if (fromCreatedDate && toCreatedDate && moment(fromCreatedDate).isValid() && moment(toCreatedDate).isValid()) {
      mailTemplateQuery.andWhere(
        new Brackets((q) => {
          q.andWhere(`(mail_templates.created_at >= '${moment(fromCreatedDate).startOf("day").format()}')`);
          q.andWhere(`(mail_templates.created_at <= '${moment(toCreatedDate).endOf("day").format()}')`);
        }),
      );
    }

    // updated_at
    if (fromUpdatedDate && moment(fromUpdatedDate).isValid() && !toUpdatedDate) {
      mailTemplateQuery.andWhere(`(mail_templates.updated_at >= '${moment(fromUpdatedDate).startOf("day").format()}')`);
    }

    if (toUpdatedDate && moment(toUpdatedDate).isValid() && !fromUpdatedDate) {
      mailTemplateQuery.andWhere(`(mail_templates.updated_at <= '${moment(toUpdatedDate).endOf("day").format()}')`);
    }

    if (fromUpdatedDate && toUpdatedDate && moment(fromUpdatedDate).isValid() && moment(toUpdatedDate).isValid()) {
      mailTemplateQuery.andWhere(
        new Brackets((q) => {
          q.andWhere(`(mail_templates.updated_at >= '${moment(fromUpdatedDate).startOf("day").format()}')`);
          q.andWhere(`(mail_templates.updated_at <= '${moment(toUpdatedDate).endOf("day").format()}')`);
        }),
      );
    }

    const [list, total] = await Promise.all([
      mailTemplateQuery
        .orderBy(`mail_templates.${sortField}`, sortType)
        .skip((page - 1) * size)
        .take(size)
        .getMany(),
      mailTemplateQuery.getCount(),
    ]);

    return new Paginate(list, total, page, size);
  }

  public async findOne(id: number): Promise<MailTemplateEntity> {
    const mailTemplate = await this.mailTemplateRepository
      .createQueryBuilder("mail_templates")
      .where("mail_templates.id = :id", { id: id })
      .getOne();
    if (!mailTemplate)
      throw new NotFoundException(ErrorCode.E104000, {
        cause: new Error(),
        description: "Mail template does not exists",
      });
    return mailTemplate;
  }

  public async update(
    auth: IAuth,
    id: number,
    updateMailTemplateDto: UpdateMailTemplateDto,
  ): Promise<MailTemplateEntity> {
    const checkMailTemplateName = await this.mailTemplateRepository.findOne({
      where: { name: updateMailTemplateDto.name, id: Not(id) },
    });

    if (checkMailTemplateName) {
      throw new AppException(ErrorCode.E104001, {
        cause: new Error(),
        description: "Mail template has already exists",
      });
    }

    const object = this.processInputMailTemplate(auth, updateMailTemplateDto);
    console.log("object", object);
    const updatedMailTemplate = await this.mailTemplateRepository
      .createQueryBuilder("mail_templates")
      .update(MailTemplateEntity)
      .set(object)
      .where("id = :id", { id: id })
      .returning("*")
      .execute();

    const result: MailTemplateEntity = updatedMailTemplate.raw[0] as MailTemplateEntity;
    return result;
  }

  public async remove(id: number): Promise<UpdateResult> {
    const mailTemplate = await this.mailTemplateRepository.findOne({ where: { id: id } });
    if (!mailTemplate) {
      throw new NotFoundException(ErrorCode.E104000, {
        cause: new Error(),
        description: "Mail template does not exists",
      });
    }

    return await this.mailTemplateRepository.softDelete({ id: id });
  }

  public processInputMailTemplate(auth: IAuth, data: CreateMailTemplateDto | UpdateMailTemplateDto) {
    const {
      programId: program_id,
      defaultFlag: default_flag,
      name,
      recipient,
      emails,
      ccEmails,
      subject,
      mainText: content,
    } = data;
    const { id, company_code } = auth;
    const object = { name, company_code, program_id, subject, content, default_flag, updated_by: id };

    const recipientFlags = {
      [Recipient.ACCOUNTEE]: "accountee_send_flag",
      [Recipient.CONSIGNEE]: "consignee_send_flag",
      [Recipient.ORDERED]: "applicant_send_flag",
      [Recipient.OWNER]: "receiving_sending_flag",
    };

    for (const flag of Object.values(recipientFlags)) {
      object[flag] = 0;
    }

    if (recipientFlags[recipient]) {
      object[recipientFlags[recipient]] = 1;
    }

    const emailKeys = ["email_address", "cc_email_address"];
    for (let i = 0; i < Math.max(emails.length, ccEmails.length); i++) {
      for (const key of emailKeys) {
        const email = key === "email_address" ? emails : ccEmails;
        if (email[i]) {
          object[`${key}_${email[i].index}`] = email[i].email ? email[i].email : null;
        }
      }
    }

    return object;
  }
}
