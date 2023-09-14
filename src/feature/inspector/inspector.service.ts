import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { InspectorEntity, InspectorQualificationEntity, UserEntity } from "src/entities";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";
import { Paginate } from "src/utils";
import { IPaginateReq } from "src/core/decorators";
import { InspectorDto, InspectorUpdateInputDto } from "./dto";
import { IAuth } from "src/core/interface";

@Injectable()
export class InspectorService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(InspectorEntity) private inspectorRepo: Repository<InspectorEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(InspectorQualificationEntity)
    private inspectorQualificationRepository: Repository<InspectorQualificationEntity>,
  ) {}

  /**
   * IC6300
   * @functionName filter
   * @param textSearch
   * @param pagination
   * @description Filter inspector
   * @returns {Promise<any>}
   */
  public async filter(pagination: IPaginateReq, textSearch: string): Promise<any> {
    const { page, size } = pagination;
    const take = size;
    const skip = (page - 1) * size;

    const queryBuilder = this.inspectorRepo
      .createQueryBuilder("inspector")
      .innerJoinAndSelect("inspector.user", "user", "user.id = inspector.user_id")
      .select([
        "inspector.id",
        "inspector.user_id",
        "inspector.inspector_type_code",
        "inspector.visit_able_flag",
        "inspector.internal_inspector_flag",
        "inspector.created_by",
        "inspector.updated_by",
        "user.company_code",
        "user.inspector_flag",
        "user.email",
        "user.lastname",
        "user.firstname",
        "user.lastname_kana",
        "user.firstname_kana",
        "user.lastname_en",
        "user.firstname_en",
      ]);

    if (textSearch) {
      queryBuilder.where("user.firstname ILIKE :search OR user.lastname ILIKE :search", { search: `%${textSearch}%` });
    }

    queryBuilder.take(take);
    queryBuilder.skip(skip);
    const [items, total] = await queryBuilder.getManyAndCount();

    return new Paginate(items, total, page, size);
  }

  /**
   * @function getById
   * @param id
   * @description Get inspector by id
   */
  public async getById(id: number): Promise<InspectorEntity> {
    const obj = await this.inspectorRepo.findOne({ where: { id: id } });
    if (!obj) throw new AppException(ErrorCode.E120002);

    const queryBuilder = this.inspectorRepo
      .createQueryBuilder("inspector")
      .innerJoinAndSelect("inspector.user", "user", "user.id = inspector.user_id")
      .select([
        "inspector.id",
        "inspector.user_id",
        "inspector.inspector_type_code",
        "inspector.visit_able_flag",
        "inspector.internal_inspector_flag",
        "inspector.created_by",
        "inspector.updated_by",
        "user.company_code",
        "user.inspector_flag",
        "user.email",
        "user.lastname",
        "user.firstname",
        "user.lastname_kana",
        "user.firstname_kana",
        "user.lastname_en",
        "user.firstname_en",
      ]);

    queryBuilder.andWhere("inspector.id = :id", { id: id });

    return await queryBuilder.getOne();
  }

  /**
   * @function deleteById
   * @param id
   * @description Delete inspector by id
   */
  public async deleteById(id: number): Promise<boolean> {
    const obj = await this.inspectorRepo.findOne({ where: { id: id } });
    if (!obj) throw new AppException(ErrorCode.E120002);
    await this.inspectorRepo.delete({ id: id });
    return true;
  }

  /**
   * @function updateById
   * @param auth
   * @param id
   * @param inspectorBody
   * @description Update inspector by id
   * @returns {Promise<InspectorEntity>}
   */
  public async updateById(auth: IAuth, id: number, inspectorBody: InspectorUpdateInputDto): Promise<InspectorEntity> {
    const obj = await this.inspectorRepo.findOne({ where: { id: id } });
    if (!obj) throw new AppException(ErrorCode.E120002);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.inspectorRepo.save({
        ...{
          id: id,
          inspector_type_code: inspectorBody.inspector_type_code,
          visit_able_flag: inspectorBody.visit_able_flag,
          internal_inspector_flag: inspectorBody.internal_inspector_flag,
          updated_by: auth.id,
        },
      });
      if (inspectorBody.authority_approved && inspectorBody.authority_approved.length > 0) {
        await this.inspectorQualificationRepository.save(
          inspectorBody.authority_approved.map((item) => {
            return {
              inspector_id: id,
              inspection_type_id: item.inspection_type_id,
              approval_permission_flag: item.approval_permission_flag,
              created_by: auth.id,
              updated_by: auth.id,
            };
          }),
        );
      }
      return await this.inspectorRepo.findOne({ where: { id: id } });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @private validate inspector body
   * @param inspectorBody
   * @description Validate inspector body
   * @returns {Promise<boolean>}
   */
  private async validateInspectorBody(inspectorBody: InspectorDto): Promise<boolean> {
    // todo: validate inspector body
    return true;
  }
}
