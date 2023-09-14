import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, In } from "typeorm";
import { map } from "lodash";
import { InspectionTypeItemEntity, TabEntity, TabItemEntity } from "src/entities";
import { InspectionTypeItemDto, TabDto } from "./tab.dto";
import { IAuth } from "src/core/interface";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";

@Injectable()
export class SetupService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(TabEntity) private tabRepo: Repository<TabEntity>,
    @InjectRepository(TabItemEntity) private tabItemRepo: Repository<TabItemEntity>,
    @InjectRepository(InspectionTypeItemEntity) private inspectionTypeItemRepo: Repository<InspectionTypeItemEntity>,
  ) {}

  /**
   * @screen IC-6120
   * @author vungpv93@gmail.com
   * @functionName setup
   * @description Setup tab items
   * - 1. Thuc hien setup tab item
   * - 2. Thuc hien setup type item.
   */
  public async setup(auth: IAuth, inspection_type_id: number, tabs: TabDto[]): Promise<any> {
    await this.__validateTabs(inspection_type_id, tabs);
    await this.__setupTabs(auth, inspection_type_id, tabs);

    let items = [];
    tabs.forEach((tab: TabDto) => {
      items = items.concat(tab.items);
    });
    await this.__setupTypeItems(auth, inspection_type_id, items);
    return tabs;
  }

  /**
   * @author vungpv93@gmail.com
   * @param inspection_type_id
   * @param tabs
   * @private __validateTabs
   */
  private async __validateTabs(inspection_type_id: number, tabs: TabDto[]): Promise<void> {
    // TODO : Need upgrade logic validator
    console.log("[__validateTabs]", { inspection_type_id, tabs });
    return;
  }

  /**
   * @author vungpv93@gmail.com
   * @param auth
   * @param inspection_type_id
   * @param tabs
   * @private __setupTabs
   */
  private async __setupTabs(auth: IAuth, inspection_type_id: number, tabs: TabDto[]): Promise<void> {
    const tabIdList: number[] = map(tabs, "id");
    console.log("__setupTabItem", { inspection_type_id, tabs });
    console.log("__setupTabItem", tabs);
    await tabs.map(async (tab: TabDto) => {
      await this.__setupTabItems(auth, inspection_type_id, tabIdList, tab);
    });
    return;
  }

  /**
   * @author vungpv93@gmail.com
   * @param auth
   * @param inspection_type_id
   * @param tab
   * @param tabIdList
   * @private __setupTabItems
   */
  private async __setupTabItems(
    auth: IAuth,
    inspection_type_id: number,
    tabIdList: number[],
    tab: TabDto,
  ): Promise<void> {
    console.log("[__setupTabItem]", tab);
    await tab.items.map(async (obj: InspectionTypeItemDto) => {
      await this.__setupTabItem(auth, inspection_type_id, tab.id, tabIdList, obj);
    });
    return;
  }

  /**
   * @author vungpv93@gmail.com
   * @param auth
   * @param inspection_item_id
   * @param tabId
   * @param tabIdList
   * @param item
   * @private __setupTabItem
   */
  private async __setupTabItem(
    auth: IAuth,
    inspection_item_id: number,
    tabId: number,
    tabIdList: number[],
    item: InspectionTypeItemDto,
  ): Promise<void> {
    const tabItemEntity = await this.tabItemRepo.findOne({
      where: { tab_id: In(tabIdList), inspection_item_id },
    });
    if (tabItemEntity) {
      const entityData = { ...tabItemEntity, tab_id: tabId, updated_by: auth.id };
      await this.tabItemRepo.save(await this.tabItemRepo.create(entityData));
    } else {
      const entityData = { tab_id: tabId, inspection_item_id, created_by: auth.id, updated_by: auth.id };
      await this.tabItemRepo.save(await this.tabItemRepo.create(entityData));
    }
  }

  /**
   * @author vungpv93@gmail.com
   * @param auth
   * @param inspection_type_id
   * @param items
   * @private __setupTypeItems
   */
  private async __setupTypeItems(
    auth: IAuth,
    inspection_type_id: number,
    items: InspectionTypeItemDto[],
  ): Promise<void> {
    console.log("[__setupTypeItems]", { auth, inspection_type_id, items });
    for await (const item of items) {
      await this.__setupTypeItem(auth, inspection_type_id, item);
    }
    // TODO [VungPv]
    // await items.map(async (item: InspectionTypeItemDto) => {
    // });
    return;
  }

  /**
   * @author vungpv93@gmail.com
   * @param auth
   * @param inspection_type_id
   * @param item
   * @private __setupTypeItem
   */
  private async __setupTypeItem(auth: IAuth, inspection_type_id: number, item: InspectionTypeItemDto): Promise<void> {
    console.log("[__setupTypeItem]", { auth, inspection_type_id, item });
    const entity = await this.inspectionTypeItemRepo.findOne({ where: { id: item.id } });
    if (!entity) throw new AppException(ErrorCode.E113000); // TODO: errCode
    await this.inspectionTypeItemRepo.save(
      this.inspectionTypeItemRepo.create({ ...entity, ...item, updated_by: auth.id }),
    );
    return;
  }
}
