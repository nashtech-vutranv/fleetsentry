import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource, In } from "typeorm";
import { map, filter } from "lodash";
import { InspectionTypeItemEntity, TabEntity, TabItemEntity } from "src/entities";
import { IAuth } from "src/core/interface";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";
import { CreateBody, TabSeqDto, UpdateBody } from "./tab.dto";

@Injectable()
export class TabsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(TabEntity) private tabRepo: Repository<TabEntity>,
    @InjectRepository(TabItemEntity) private tabItemRepo: Repository<TabItemEntity>,
    @InjectRepository(InspectionTypeItemEntity) private inspectionTypeItemRepo: Repository<InspectionTypeItemEntity>,
  ) {}

  /**
   * @param inspection_type_id
   */
  public async loadAllDataByInspectionId(inspection_type_id: number): Promise<any> {
    const items: InspectionTypeItemEntity[] = await this.inspectionTypeItemRepo.find({
      where: { inspection_type_id },
    });

    let tabs: TabEntity[] = await this.findAllByInspectionId(inspection_type_id);
    const tabIdList = map(tabs, "id");

    const tabItemList: TabItemEntity[] = await this.tabItemRepo.find({
      where: { tab_id: In(tabIdList) },
    });

    const itemIdList: number[] = map(tabItemList, "inspection_item_id"); // Cac item da dc assign vao tab.

    tabs = tabs.map((tab: TabEntity) => {
      const insItemIdList: number[] = map(
        filter(tabItemList, (obj: TabItemEntity) => obj.tab_id === tab.id),
        "inspection_item_id",
      );
      tab.items = filter(items, (item: InspectionTypeItemEntity) => insItemIdList.includes(item.inspection_item_id));
      return tab;
    });

    const itemsAvailable: InspectionTypeItemEntity[] = filter(
      items,
      (obj: InspectionTypeItemEntity) => !itemIdList.includes(obj.inspection_item_id),
    );
    return {
      items: itemsAvailable,
      tabs: tabs,
    };
  }

  /**
   * @functionName findAllByInspectionId
   * @param inspection_type_id
   * @description Lay danh sach tabs theo inspection_type_id (BIO, NZTA)
   */
  public async findAllByInspectionId(inspection_type_id: number) {
    return await this.tabRepo.find({
      where: {
        inspection_type_id: inspection_type_id,
      },
      order: {
        order: "ASC",
        id: "ASC",
      },
    });
  }
  /**
   * @param id
   */
  public async findOne(id: number) {
    const obj = await this.tabRepo.findOne({ where: { id: id } });
    if (!obj) throw new AppException(ErrorCode.E113000);

    return obj;
  }

  /**
   * @param auth
   * @param param
   */
  public async store(auth: IAuth, param: CreateBody): Promise<TabEntity> {
    return await this.tabRepo.save(
      this.tabRepo.create({
        ...param,
        created_by: auth.id,
        updated_by: auth.id,
      }),
    );
  }

  /**
   * @screen IC-6120, IC-6123
   * @author vungpv93@gmail.com
   * @functionName updateTabSeq
   * @param tabs
   */
  public async updateTabSeq(tabs: TabSeqDto[]): Promise<void> {
    // TODO : Co the can cap nhat logic validate.
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await tabs.map(async (tab: TabSeqDto) => {
        await this.tabRepo.update({ id: tab.id }, { order: tab.order });
      });
      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new AppException(ErrorCode.E113099);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @author vungpv93@gmail.com
   * @functionName update
   * @param id
   * @param auth
   * @param param
   */
  public async update(id: number, auth: IAuth, param: UpdateBody): Promise<any> {
    const obj = await this.findOne(id);
    // TODO: handle validate by requirement
    return await this.tabRepo.save(this.tabRepo.create({ ...obj, ...param, updated_by: auth.id }));
  }

  /**
   * @author vungpv93@gmail.com
   * @function destroy
   * @param id
   * @description
   * - Remove TabItemEntity
   * - Remove TabEntity
   */
  public async destroy(id: number): Promise<boolean> {
    const obj = await this.findOne(id);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.tabItemRepo.delete({ tab_id: obj.id });
      await this.tabRepo.delete({ id: obj.id });
      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new AppException(ErrorCode.E113099);
    } finally {
      await queryRunner.release();
    }

    return true;
  }
}
