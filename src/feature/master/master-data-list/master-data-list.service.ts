import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IAuth } from "src/core/interface";
import {
  CommentEntity,
  InspectionTypeEntity,
  ReasonEntity,
  SiteEntity,
  RoleEntity,
  MstProgramEntity,
  DrawingEntity,
  SystemParameterEntity,
  InspectorEntity,
} from "src/entities";
import { Repository } from "typeorm";
import { FilterBaseDto } from "./master-data-list.dto";

@Injectable()
export class MasterDataListService {
  constructor(
    @InjectRepository(InspectionTypeEntity) private insTypeRepo: Repository<InspectionTypeEntity>,
    @InjectRepository(ReasonEntity) private reasonRepo: Repository<ReasonEntity>,
    @InjectRepository(CommentEntity) private commentRepo: Repository<CommentEntity>,
    @InjectRepository(SiteEntity) private siteRepo: Repository<SiteEntity>,
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
    @InjectRepository(MstProgramEntity) private programRepo: Repository<MstProgramEntity>,
    @InjectRepository(SystemParameterEntity) private systemParameterRepo: Repository<SystemParameterEntity>,
    @InjectRepository(DrawingEntity) private drawingRepo: Repository<DrawingEntity>,
    @InjectRepository(InspectorEntity) private inspectorRepo: Repository<InspectorEntity>,
  ) {}

  /**
   * @author vuducdung93@gmail.com
   * @function getInsTypes
   * @param auth
   */
  public async getInsTypes(auth: IAuth) {
    return this.insTypeRepo
      .createQueryBuilder("ins-type")
      .where("ins-type.company_code = :company_code", { company_code: auth.company_code })
      .select(["ins-type.id", "ins-type.inspection_code"])
      .getMany();
  }

  /**
   * @author vuducdung93@gmail.com
   * @function getInsTypeReasons
   * @param auth
   * @param filterReason
   */
  public async getInsTypeReasons(auth: IAuth, filterReason?: FilterBaseDto) {
    const reasonsQuery = this.reasonRepo
      .createQueryBuilder("reason")
      .leftJoinAndMapOne(
        "reason.inspection_type",
        InspectionTypeEntity,
        "inspection_type",
        "inspection_type.id = reason.inspection_type_id",
      )
      .where("inspection_type.company_code = :company_code", { company_code: auth.company_code })
      .select(["reason.id", "reason.name"]);
    if (filterReason && filterReason.inspection_type_id)
      reasonsQuery.andWhere("reason.inspection_type_id = :inspection_type_id", {
        inspection_type_id: filterReason.inspection_type_id,
      });
    return reasonsQuery.getMany();
  }

  /**
   * @author vuducdung93@gmail.com
   * @function getInsTypeComments
   * @param auth
   * @param filterComment
   */
  public async getInsTypeComments(auth: IAuth, filterComment?: FilterBaseDto) {
    const commentsQuery = this.commentRepo
      .createQueryBuilder("comment")
      .leftJoinAndMapOne(
        "comment.inspection_type",
        InspectionTypeEntity,
        "inspection_type",
        "comment.inspection_type_id = inspection_type.id",
      )
      .where("inspection_type.company_code = :company_code", { company_code: auth.company_code })
      .select(["comment.id", "comment.name"]);

    if (filterComment && filterComment.inspection_type_id)
      commentsQuery.andWhere("comment.inspection_type_id = :inspection_type_id", {
        inspection_type_id: filterComment.inspection_type_id,
      });

    return commentsQuery.getMany();
  }

  /**
   * @author vuducdung93@gmail.com
   * @function getSites
   * @param auth
   * @param filterSite
   */
  public async getSites(auth: IAuth, filterSite?: FilterBaseDto) {
    const sitesQuery = this.siteRepo
      .createQueryBuilder("site")
      .where("site.company_code = :company_code", { company_code: auth.company_code })
      .select(["site.id", "site.name", "site.name_en"]);

    if (filterSite && filterSite.inspection_type_id)
      sitesQuery
        .leftJoin("site.possible_inspections", "possible_inspection")
        .andWhere("possible_inspection.inspection_type_id = :inspection_type_id", {
          inspection_type_id: filterSite.inspection_type_id,
        });
    return sitesQuery.getMany();
  }

  /**
   * @author vuducdung93@gmail.com
   * @function getRoles
   * @param auth
   */
  public async getRoles(auth: IAuth) {
    return this.roleRepo
      .createQueryBuilder("role")
      .where("role.company_code = :company_code", { company_code: auth.company_code })
      .select(["role.id", "role.name"])
      .getMany();
  }

  /**
   * @author vuducdung93@gmail.com
   * @function getPrograms
   */
  public async getPrograms() {
    return this.programRepo
      .createQueryBuilder("program")
      .select(["program.id", "program.program_name", "program.program_name_en"])
      .getMany();
  }

  /**
   * @author vuducdung93@gmail.com
   * @function getSystemParameters
   * @param auth
   */
  public async getSystemParameters(auth: IAuth) {
    return this.systemParameterRepo
      .createQueryBuilder("system-parameter")
      .where("system-parameter.company_code = :company_code", { company_code: auth.company_code })
      .select(["system-parameter.id", "system-parameter.name"])
      .getMany();
  }

  /**
   * @author vungpv93@gmail.com
   * @functionName getDrawings
   * @param auth
   */
  public async getDrawings(auth: IAuth): Promise<DrawingEntity[]> {
    return await this.drawingRepo.find({
      where: { company_code: auth.company_code },
      order: { created_at: "ASC" },
      select: ["id", "name", "name_en", "image_path"],
    });
  }

  /**
   * @author vuducdung93@gmail.com
   * @function getInspectors
   * @param auth
   */
  public async getInspectors(auth: IAuth) {
    return this.inspectorRepo
      .createQueryBuilder("inspector")
      .leftJoin("inspector.user", "user")
      .where("user.company_code = :company_code", { company_code: auth.company_code })
      .select([
        "inspector.id as inspector_id",
        "user.id as user_id",

        // TODO [VungPV]
        "CONCAT(user.firstname, ' ', user.lastname) AS fullname",
      ])
      .getRawMany();
  }
}
