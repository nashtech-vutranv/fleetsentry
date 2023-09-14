import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, QueryRunner, Repository } from "typeorm";
import {
  InspectionScheduleResultEntity,
  UserEntity,
  InspectorEntity,
  SiteEntity,
  InspectorQualificationEntity,
  InspectionTypeResultEntity,
  InspectionTypeEntity,
} from "src/entities";
import { IAuth } from "src/core/interface";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";
import { UpdateVehicalDto, UpdateInspectionDto, VehicleDetailDto } from "./dto";
import { ArrayUtil } from "src/utils";

interface IVehicleDetail {
  identification_number: string;
  order_number: string;
  inspections: InspectionScheduleResultEntity[];
}
interface IInsAndUpdateGr {
  inspection: InspectionScheduleResultEntity;
  update: UpdateInspectionDto;
}
@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(InspectionScheduleResultEntity)
    private inspectionRepo: Repository<InspectionScheduleResultEntity>,
    private dataSource: DataSource,
    @InjectRepository(InspectorEntity) private inspectorRepo: Repository<InspectorEntity>,
    @InjectRepository(InspectionTypeEntity) private inspectionType: Repository<InspectionTypeEntity>,
  ) {}

  /**
   * @author vuducdung93@gmail.com
   * @function findOne
   * @param auth
   * @param id: order_number
   */
  public async findOne(auth: IAuth, id: string): Promise<VehicleDetailDto> {
    const vehicle = await this._findOne(auth, id);
    return VehicleDetailDto.plainToInstance(vehicle);
  }

  /**
   * @author vuducdung93@gmail.com
   * @function update
   * @param auth
   * @param id: order_number
   * @param updateData
   */
  public async update(auth: IAuth, id: string, updateData: UpdateVehicalDto) {
    if (updateData.items) updateData.items = ArrayUtil.mergeObjectsByKey(updateData.items, "id");

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const vehicle = await this._findOne(auth, id, queryRunner);

      if (updateData.items && updateData.items.length > 0) {
        //flag to enable the check method
        let isCheckUpdateResultField = false;

        const insAndUpdateGrs = updateData.items.map((itemUpdate) => {
          const inspection = vehicle.inspections.find((item) => item.id === itemUpdate.id);
          if (!inspection) throw new AppException(ErrorCode.E301001);
          //cannot update when approved_by is set
          if (inspection.approved_by) throw new AppException(ErrorCode.E301002);

          if (itemUpdate.inspection_result) isCheckUpdateResultField = true;
          return { inspection, update: itemUpdate };
        });

        const inspectionPreUpdate = await this.preUpdate(auth, insAndUpdateGrs, isCheckUpdateResultField);

        const inspectionsUpdated = await queryRunner.manager.save(inspectionPreUpdate);

        vehicle.inspections = ArrayUtil.mergeObjectsByKey([...vehicle.inspections, ...inspectionsUpdated], "id");
        await queryRunner.commitTransaction();
        return VehicleDetailDto.plainToInstance(vehicle);
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async _findOne(auth: IAuth, id: string, queryRunner?: QueryRunner): Promise<IVehicleDetail> {
    const inspections = await this.inspectionRepo
      .createQueryBuilder("ins", queryRunner)

      //ins join inspector table
      .leftJoinAndMapOne(
        "ins.inspected_inspector",
        InspectorEntity,
        "inspector",
        "inspector.id = ins.inspected_inspector_id",
      )

      //inspector join user table
      .leftJoinAndMapOne("inspector.user", UserEntity, "user", "user.id = inspector.user_id")

      //ins join site table on inspected_site_id field
      .leftJoinAndMapOne(
        "ins.inspected_site",
        SiteEntity,
        "inspected_site",
        "ins.inspected_site_id IS NOT NULL AND ins.inspected_site_id = inspected_site.id",
      )

      .where("ins.order_number like :order_number", { order_number: id })
      .andWhere("ins.company_code like :company_code", { company_code: auth.company_code })
      .getMany();

    if (inspections.length === 0) throw new AppException(ErrorCode.E301000);

    /**
     * TODO:
     * get vehicle info in ERP : type, color, maker
     * get ship info in ERP: ship_name, port_code, destination_country, applicant, shiper, fowarder,consinee, etd
     */

    return {
      identification_number: inspections[0].identification_number,
      order_number: inspections[0].order_number,
      inspections: inspections,
    };
  }

  private async preUpdate(auth: IAuth, insAndUpdateGrs: IInsAndUpdateGr[], isCheckUpdateResult: boolean) {
    if (isCheckUpdateResult) await this.checkUpdateResult(insAndUpdateGrs);
    await this.checkUpdatePermission(auth, insAndUpdateGrs);

    return insAndUpdateGrs.map((item) => this.createUpdateItem(auth, item.inspection, item.update));
  }

  private createUpdateItem(
    auth: IAuth,
    inspection: InspectionScheduleResultEntity,
    itemUpdate: UpdateInspectionDto,
  ): InspectionScheduleResultEntity {
    let objUpdate: Partial<InspectionScheduleResultEntity> = {};

    if (itemUpdate.approval_status) {
      objUpdate.approved_by = auth.id;
    }
    if (itemUpdate.inspection_result) objUpdate.inspection_result = itemUpdate.inspection_result;

    if (
      itemUpdate.approval_status ||
      (itemUpdate.inspection_result && itemUpdate.inspection_result !== inspection.inspection_result)
    ) {
      objUpdate.updated_by = auth.id;
    }

    return this.inspectionRepo.create({ ...inspection, ...objUpdate });
  }

  private async checkUpdateResult(insAndUpdateGrs: IInsAndUpdateGr[]): Promise<void> {
    const ids = insAndUpdateGrs.map(({ inspection }) => inspection.inspection_type_id);
    const insTypes = await this.filterInspectionTypeWithTypeResult(ids);

    for (const { inspection, update } of insAndUpdateGrs) {
      if (update.inspection_result) {
        const insType = insTypes.find((item) => item.id === inspection.inspection_type_id);
        if (!insType) throw new AppException(ErrorCode.E111000);
        if (insType.insTypeResults.findIndex((item) => item.inspection_result_code === update.inspection_result) === -1)
          throw new AppException(ErrorCode.E301005);
      }
    }
  }

  private async checkUpdatePermission(auth: IAuth, insAndUpdateGrs: IInsAndUpdateGr[]): Promise<void> {
    const inspector = await this.getInspectorWithQualificationByUser(auth);
    for (const { inspection, update } of insAndUpdateGrs) {
      const isInspectorLead =
        inspector.inspectorQualifications.findIndex(
          (item) => item.inspection_type_id === inspection.inspection_type_id && item.approval_permission_flag > 0,
        ) > -1;
      // cannot permission set approve inspection
      if (update.approval_status && !isInspectorLead) throw new AppException(ErrorCode.E301003);

      // neither the owner nor the leader
      if (update.inspection_result && inspection.inspected_inspector_id !== inspector.id && !isInspectorLead)
        throw new AppException(ErrorCode.E301004);
    }
  }

  private async getInspectorWithQualificationByUser(
    auth: IAuth,
  ): Promise<InspectorEntity & { inspectorQualifications: InspectorQualificationEntity[] }> {
    const inspector = (await this.inspectorRepo
      .createQueryBuilder("inspector")
      .leftJoinAndMapMany(
        "inspector.inspectorQualifications",
        InspectorQualificationEntity,
        "inspector-qualification",
        "inspector.id = inspector-qualification.inspector_id",
      )
      .where("inspector.user_id = :user_id", { user_id: auth.id })
      .getOne()) as any;
    if (!inspector) throw new AppException(ErrorCode.E120002);
    return inspector;
  }

  private async filterInspectionTypeWithTypeResult(
    ids: number[],
  ): Promise<Array<InspectionTypeEntity & { insTypeResults: InspectionTypeResultEntity[] }>> {
    return this.inspectionType
      .createQueryBuilder("ins-type")
      .leftJoinAndMapMany(
        "ins-type.insTypeResults",
        InspectionTypeResultEntity,
        "ins-type-rs",
        "ins-type.id = ins-type-rs.inspection_type_id",
      )
      .where("ins-type.id IN (:...ids)", { ids: ids })
      .getMany() as any;
  }
}
