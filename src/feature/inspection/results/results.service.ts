import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, LessThanOrEqual, Repository } from "typeorm";
import {
  InspectionItemResultsEntity,
  InspectionScheduleResultEntity,
  InspectionTypeItemEntity,
  MstInspectionItemEntity,
  TabEntity,
  TabItemEntity,
  VehicleCommentEntity,
} from "src/entities";
import { VehicleCommentService } from "../vehicle-comment/vehicle-comment.service";
import { AppException } from "src/core/exceptions";
import { ErrorCode, InputTypeEnum } from "src/enums";
import { find } from "lodash";
import { Inspection } from "src/utils/inspection";
import { InspectionResult, ItemResult } from "./results.dto";

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(MstInspectionItemEntity) private inspectionItemRepo: Repository<MstInspectionItemEntity>,
    @InjectRepository(InspectionTypeItemEntity) private insTypeItemRepo: Repository<InspectionTypeItemEntity>,
    @InjectRepository(InspectionItemResultsEntity)
    private inspectionItemResultRepo: Repository<InspectionItemResultsEntity>,
    @InjectRepository(InspectionScheduleResultEntity)
    private insScheduleResultRepo: Repository<InspectionScheduleResultEntity>,
    @InjectRepository(TabEntity) private tabRepo: Repository<TabEntity>,
    private vehicleCommentService: VehicleCommentService,
  ) {}

  /**
   * @screen IC-3110
   * @author vungpv93@gmail.com
   * @functionName findInsScheduleResult
   * @param inspection_schedule_id
   * @description
   *  (1) - inspectionResult
   *  (2) - dynamicTabs
   *  (3) - preInspectionResult
   *      a.inspectionResult
   *      b.dynamicTabs
   *  (4) - vehicleComments
   *  (5) - pastInsHistories
   *  (6) - fullInsList
   */
  public async findInsScheduleResult(inspection_schedule_id: number): Promise<any> {
    const entity: InspectionScheduleResultEntity = await this.__findOne(inspection_schedule_id);
    const dynamicTabs = await this.getDynamicTabs(entity.id, entity.inspection_type_id);
    const preInspectionResult: any = await this.getPreInspectionResult(entity);
    const comments: VehicleCommentEntity[] = await this.vehicleCommentService.getVehicleCommentByIdentificationNumber(
      entity.identification_number,
    );
    const pastInsHistories: InspectionScheduleResultEntity[] = await this.__getPastInsHistoriesList(entity);
    const fullInsList: InspectionScheduleResultEntity[] = await this.__getFullInsList(entity);
    return {
      inspectionResult: entity,
      dynamicTabs: dynamicTabs ?? [],
      preInspectionResult: preInspectionResult,
      vehicleComments: comments ?? [],
      pastInsHistories: pastInsHistories,
      fullInsList: fullInsList ?? [],
      aiRis: null, // TODO [VungPV]
      nak: null, // TODO [VungPV]
    };
  }

  /**
   * @screen IC-3110
   * @param inspection_schedule_result_id
   * @param inspection_type_id
   * @private getDynamicTabs
   * @description
   * (1) Lay danh sach cac tab theo inspection_type_id
   * (2) Lay danh sach cac tab_items va inspection_items theo inspection_type_id ( Tab Content )
   */
  private async getDynamicTabs(inspection_schedule_result_id: number, inspection_type_id: number): Promise<any> {
    const tabs: any = await this.tabRepo.find({
      relations: { tabItems: true },
      where: { inspection_type_id },
      order: { order: "ASC", id: "ASC" },
    });

    const inspectionItemIdList: any[] = [];
    tabs.forEach((tab: TabEntity): void => {
      tab.tabItems.forEach((tabItem: TabItemEntity) => {
        inspectionItemIdList.push(tabItem.inspection_item_id);
      });
    });

    const itemList: MstInspectionItemEntity[] = await this.__getInspectionItemList(inspectionItemIdList);
    const itemResultList: InspectionItemResultsEntity[] = await this.__getInspectionItemResultList(
      inspection_schedule_result_id,
      inspectionItemIdList,
    );

    return tabs.map((tab: TabEntity) => {
      tab.tabItems = tab.tabItems.map((tabItem: TabItemEntity) => {
        const itemConf: MstInspectionItemEntity | null = find(
          itemList,
          (obj: MstInspectionItemEntity): boolean => obj.id === tabItem.inspection_item_id,
        );
        tabItem.itemConf = Inspection.toItem(itemConf);
        const itemData: InspectionItemResultsEntity | null = find(
          itemResultList,
          (obj: InspectionItemResultsEntity): boolean => obj.inspection_item_id === tabItem.inspection_item_id,
        );
        tabItem.itemData = itemData ?? null;
        return tabItem;
      });
      return tab;
    });
  }

  private async __getInspectionItemList(inspectionItemIdList: number[]): Promise<MstInspectionItemEntity[]> {
    return await this.inspectionItemRepo.find({
      where: {
        id: In(inspectionItemIdList),
      },
    });
  }

  private async __getInspectionItemResultList(
    inspection_schedule_result_id: number,
    inspectionItemIdList: number[],
  ): Promise<InspectionItemResultsEntity[]> {
    return await this.inspectionItemResultRepo.find({
      where: {
        inspection_schedule_result_id: inspection_schedule_result_id,
        inspection_item_id: In(inspectionItemIdList),
      },
    });
  }

  /**
   * @screen IC-3110
   * @author vungpv93@gmail.com
   * @functionName getRreInspectionResult
   * @param inspectionScheduleResult
   * @return { inspectionResult: object, dynamicTabs: [] } | null
   * @description
   * (1) Lay thong tin previous inspection.
   * (2) Lay thong tin ve dynamic tabs ( Gia tri da dc nhap lieu tai lan kiem dinh do ).
   */
  private async getPreInspectionResult(inspectionScheduleResult: InspectionScheduleResultEntity): Promise<any> {
    if (inspectionScheduleResult.seqn === 1) return null;
    const previous: InspectionScheduleResultEntity = await this.insScheduleResultRepo.findOne({
      where: {
        company_code: inspectionScheduleResult.company_code,
        inspection_type_id: inspectionScheduleResult.inspection_type_id,
        order_number: inspectionScheduleResult.order_number,
        item: inspectionScheduleResult.item,
        seqn: LessThanOrEqual(inspectionScheduleResult.seqn), // TODO [VungPV] - Cân xác định lại logic này
      },
      order: { seqn: "DESC" },
    });

    if (!previous) return null;

    const dynamicTabs = await this.getDynamicTabs(previous.id, previous.inspection_type_id);
    return {
      inspectionResult: previous,
      dynamicTabs: dynamicTabs,
    };
  }

  /**
   * @screen IC-3110
   * @private pastInsHistories
   * @author vungpv93@gmail.com
   * @param inspectionScheduleResult
   * @description - Lay danh sach cac inspection da dc lam.
   */
  private async __getPastInsHistoriesList(
    inspectionScheduleResult: InspectionScheduleResultEntity,
  ): Promise<InspectionScheduleResultEntity[]> {
    // TODO [VungPV] - Can xac dinh lai dieu kien hien thi
    return await this.insScheduleResultRepo.find({
      where: {
        company_code: inspectionScheduleResult.company_code,
        inspection_type_id: inspectionScheduleResult.inspection_type_id,
        identification_number: inspectionScheduleResult.identification_number,
      },
      order: { id: "DESC" },
    });
  }

  /**
   * @screen IC-3110
   * @private __getFullInsList
   * @author vungpv93@gmail.com
   * @param inspectionScheduleResult
   * @description - Lay danh sach cac inspection dc dat trong cung lan ORDER.
   */
  private async __getFullInsList(
    inspectionScheduleResult: InspectionScheduleResultEntity,
  ): Promise<InspectionScheduleResultEntity[]> {
    // TODO [VungPV] - Can xac dinh lai dieu kien hien thi
    return await this.insScheduleResultRepo.find({
      where: {
        company_code: inspectionScheduleResult.company_code,
        identification_number: inspectionScheduleResult.identification_number,
        item: inspectionScheduleResult.item,
      },
      order: { item: "ASC", id: "ASC" },
    });
  }

  /**
   *  ==================================================================================================================
   */

  /**
   * @param schedule_result_id number
   * @param items ItemResult[]
   * @param insResult InspectionResult
   * @description
   * (1) Get / FindOne schedule_result_id
   * (2) Thuc hien luu du lieu vao inspection_schedule_results
   * (3) Thuc hien luu du lieu vao inspection_item_results
   */
  public async save(schedule_result_id: number, items: ItemResult[], insResult: InspectionResult): Promise<any> {
    const entity: InspectionScheduleResultEntity = await this.__findOne(schedule_result_id);
    await this.__saveItemResults(entity, items);
    await this.__saveInspectionResult(entity, insResult);
    return true;
  }

  /**
   * @functionName __saveInspectionResult
   * @author vungpv93@gmail.com
   * @private
   */
  private async __saveInspectionResult(
    entity: InspectionScheduleResultEntity,
    insResult: InspectionResult,
  ): Promise<void> {
    // TODO [VungPV] - Kiem tra tinh hop le cua du lieu truoc khi save.
    await this.insScheduleResultRepo.save({
      ...entity,
      ...insResult,
    });
  }

  /**
   * @functionName __saveItemResults
   * @author vungpv93@gmail.com
   * @param entity
   * @param items
   * @private
   * @description
   * - Check theo inspection_type_id
   * - Check theo master_inspection_items
   * - Validator du lieu theo rule dc dinh nghia san.
   */
  private async __saveItemResults(entity: InspectionScheduleResultEntity, items: ItemResult[]): Promise<void> {
    const { inspection_type_id } = entity;
    const typeItems: InspectionTypeItemEntity[] = await this.insTypeItemRepo.find({ where: { inspection_type_id } });
    const itemIdList: number[] = typeItems.map((obj: InspectionTypeItemEntity) => obj.inspection_item_id);
    // TODO [VungPV] - Can cap nhat logic validator cho TH cap nhat Inspection Item Data.
    const itemList: MstInspectionItemEntity[] = await this.inspectionItemRepo.find({ where: { id: In(itemIdList) } });
    for (const item of items) {
      const itemConf: MstInspectionItemEntity = find(itemList, (obj): boolean => obj.id === item.inspection_item_id);
      if (!itemConf) throw new AppException(ErrorCode.E110000);
      if (itemConf.input_type !== item.input_type) throw new AppException(ErrorCode.E110000);
      await this.__saveItemResult(item);
    }
  }

  /**
   * @functionName __saveItemResult
   * @author vungpv93@gmail.com
   * @param item
   * @private
   */
  private async __saveItemResult(item: ItemResult): Promise<void> {
    const itemResultEntity: InspectionItemResultsEntity = await this.inspectionItemResultRepo.findOne({
      where: {
        inspection_schedule_result_id: item.inspection_schedule_result_id,
        inspection_item_id: item.inspection_item_id,
      },
    });
    const pass_fail_result: number = this.___calculateResult(item);
    if (itemResultEntity) {
      await this.inspectionItemResultRepo.save({ ...itemResultEntity, ...item, pass_fail_result });
    } else {
      await this.inspectionItemResultRepo.save(this.inspectionItemResultRepo.create({ ...item, pass_fail_result }));
    }
  }

  /**
   * @author vungpv93@gmail.com
   * @functionName ___calculateResult
   * @param item
   * @private
   * @description
   * - Thuc hien tinh toan pass or fail khi nhap kqua cho item.
   * - 1. Pass
   * - 0. Fail
   * - null: N/A
   */
  private ___calculateResult(item: ItemResult): number {
    // TODO [VungPv] - Can cap nhat logic tinh toan Pass || Fail
    if (item.input_type === InputTypeEnum.Coordinate) return null;
    return 1;
  }

  private async __findOne(inspection_schedule_id: number): Promise<InspectionScheduleResultEntity> {
    const entity: InspectionScheduleResultEntity = await this.insScheduleResultRepo.findOne({
      where: { id: inspection_schedule_id },
    });
    if (!entity) throw new AppException(ErrorCode.E115000);

    return entity;
  }
}
