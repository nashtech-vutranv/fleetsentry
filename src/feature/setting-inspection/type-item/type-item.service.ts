import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isEmpty, map } from "lodash";
import { DataSource, Repository, In, Not } from "typeorm";
import {
  InspectionTypeEntity,
  InspectionTypeItemEntity,
  MstInspectionItemEntity,
  TabEntity,
  TabItemEntity,
} from "src/entities";
import { IAuth } from "src/core/interface";
import { StoreBody } from "./type-item.dto";
import { TypeService } from "../types/types.service";

@Injectable()
export class TypeItemService {
  constructor(
    @InjectRepository(InspectionTypeEntity) private inspectionTypeRepo: Repository<InspectionTypeEntity>,
    @InjectRepository(MstInspectionItemEntity) private inspectionItemRepo: Repository<MstInspectionItemEntity>,
    @InjectRepository(InspectionTypeItemEntity) private inspectionTypeItemRepo: Repository<InspectionTypeItemEntity>,
    @InjectRepository(TabEntity) private tabRepo: Repository<TabEntity>,
    @InjectRepository(TabItemEntity) private tabItemRepo: Repository<TabItemEntity>,
    private readonly typeService: TypeService,
    private readonly dataSource: DataSource,
  ) {
  }

  /**
   * IC-6110
   * @author vungpv93@gmail.com
   * @param auth
   * @param inspection_type_id
   * @description
   * - Dac biet chi can tra ve 1 so key can thiet.
   * @return
   * @example
   * [
   *    {
   *        "id": 1,
   *        "inspection_type_id": 1,
   *        "inspection_item_id": 1
   *    },
   *    {
   *        "id": 2,
   *        "inspection_type_id": 1,
   *        "inspection_item_id": 2
   *    }
   *    {
   *        "id": 2,
   *        "inspection_type_id": 1,
   *        "inspection_item_id": 9
   *    }
   * ]
   */
  public async all(auth: IAuth, inspection_type_id: number) {
    const types: InspectionTypeEntity[] = await this.inspectionTypeRepo.find({
      select: ["id", "inspection_code", "mode"],
      where: { mode: 1 }, order: { created_at: "DESC" },
    });

    const items = await this.inspectionItemRepo.find({
      select: ["id", "name", "input_type"],
      order: { created_at: "DESC" },
    });

    const typeItemList = await this.inspectionTypeItemRepo.find({
      where: { company_code: auth.company_code },
      select: ["id", "inspection_type_id", "inspection_item_id"],
    });

    return {
      types: types ?? [],
      items: items,
      type_items: typeItemList,
    };
  }

  /**
   * @param auth
   * @param param
   */
  public async store(auth: IAuth, param: StoreBody): Promise<true> {
    await this.typeService.findOne(param.inspection_type_id);

    // todo : validate items valid.

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Remove tabItem.
      await this.__revokeTabItem(param.inspection_type_id, param.items);

      // Remove inspectionTypeItem
      await this.__revokeInspectionTypeItem(param.inspection_type_id, param.items);

      // Add InspectionTypeItem
      if (!isEmpty(param.items))
        await this.__addInspectionTypeItem(auth, param.inspection_type_id, param.items);

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async __saveAsItem(param: {
    inspection_type_id: number;
    inspection_item_id: number;
    company_code: string;
  }): Promise<void> {
    const entity = await this.inspectionTypeItemRepo.findOne({ where: param });
    if (!entity) await this.inspectionTypeItemRepo.save(this.inspectionTypeItemRepo.create(param));
  }

  /**
   * @author vungpv93@gmail.com
   * @private __removeAsTabItem
   * @description Thuc hien remove tat ca cac item khoi tab thuoc inspection_type_id.
   */
  private async __revokeTabItem(inspection_type_id: number, items: number[]): Promise<void> {
    const tabs: TabEntity[] = await this.tabRepo.find({ where: { inspection_type_id } });
    if (isEmpty(tabs)) return null;
    const tabIdList = map(tabs, "id");

    if (isEmpty(items)) {
      await this.tabItemRepo.delete({ tab_id: In(tabIdList) });
    } else {
      await this.tabItemRepo.delete({ tab_id: In(tabIdList), inspection_item_id: Not(In(items)) });
    }
  }

  /**
   * @param inspection_type_id
   * @param items
   * @private __revokeInspectionTypeItem
   * @description Thuc hien viec thu hoi, xoa cac inspection type item khong dc chon.
   */
  private async __revokeInspectionTypeItem(inspection_type_id: number, items: number[]): Promise<void> {
    const criteria: any = {
      inspection_type_id: inspection_type_id,
    };

    if (isEmpty(items)) criteria.inspection_item_id = Not(In(items));

    await this.inspectionTypeItemRepo.delete(criteria);

    return;
  }

  private async __addInspectionTypeItem(auth: IAuth, inspection_type_id: number, items: number[]): Promise<void> {
    await Promise.all(
      items.map(async (itemId: number) => {
        await this.__saveAsItem({ inspection_type_id, inspection_item_id: itemId, company_code: auth.company_code });
      }),
    );
  }
}
