import { Injectable } from "@nestjs/common";
import { In, Not, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { map, isEmpty, filter } from "lodash";
import { IPaginateReq } from "src/core/decorators";
import { AppException } from "src/core/exceptions";
import { IAuth } from "src/core/interface";
import { MstInspectionItemEntity, RadioOptionEntity } from "src/entities";
import { ErrorCode, InputTypeEnum } from "src/enums";
import { Paginate } from "src/utils";
import { CreateBody, RadioItemOption, UpdateBody } from "./items.dto";
import { GenericCodeService } from "../../generic-code/generic-code.service";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(MstInspectionItemEntity) private inspectionItemRepo: Repository<MstInspectionItemEntity>,
    @InjectRepository(RadioOptionEntity) private radioOptionRepo: Repository<RadioOptionEntity>,
    private readonly genericCodeService: GenericCodeService,
  ) {}

  /**
   * @functionName filter
   * @author vungpv93@gmail.com
   */
  public async filter(pagination: IPaginateReq): Promise<any> {
    const { page, size } = pagination;
    const take = size;
    const skip = (page - 1) * size;

    const [items, total] = await this.inspectionItemRepo.findAndCount({
      take: take,
      skip: skip,
    });

    return new Paginate(items, total, page, size);
  }

  /**
   * @author vungpv93@gmail.com
   * @functionName checkExists
   * @param name
   * @param id
   * @private
   */
  private async __checkExists(name: string, id?: number): Promise<boolean> {
    if (id) return this.inspectionItemRepo.exist({ where: { name: name, id: Not(id) } });
    return this.inspectionItemRepo.exist({ where: { name: name } });
  }

  /**
   * @functionName findOne
   * @author vungpv93@gmail.com
   * @param id
   */
  public async findOne(id: number): Promise<MstInspectionItemEntity> {
    const obj: MstInspectionItemEntity = await this.inspectionItemRepo.findOne({ where: { id: id } });

    if (!obj) throw new AppException(ErrorCode.E110000);

    let option: any = null;
    switch (obj.input_type) {
      case InputTypeEnum.TextNumber:
        option = {
          min_digits: obj.min_digits,
          max_digits: obj.max_digits,
          decimal_point_digits: obj.decimal_point_digits,
          unit: obj.unit,
        };
        break;

      case InputTypeEnum.TextBox:
        option = {
          min_digits: obj.min_digits,
          max_digits: obj.max_digits,
        };
        break;

      case InputTypeEnum.Date:
        option = {
          future_date_flag: obj.future_date_flag,
          max_future_days: obj.max_future_days,
          past_date_flag: obj.past_date_flag,
          max_past_days: obj.max_past_days,
        };
        break;

      case InputTypeEnum.Image:
        option = {
          image_size: obj.image_size,
        };
        break;

      case InputTypeEnum.OnOff:
        option = {
          label: obj.label,
          label_en: obj.label_en,
          value: obj.value,
        };
        break;
      case InputTypeEnum.Dropdown:
        option = {
          key_type: obj.key_type,
        };
        break;
      case InputTypeEnum.Coordinate:
        option = {
          key_type_1: obj.key_type_1,
          key_type_2: obj.key_type_2,
        };
        break;
      case InputTypeEnum.Radio:
        const items: RadioItemOption[] = await this.radioOptionRepo.find({
          select: ["id", "inspection_item_id", "label", "label_en", "value"],
          where: { inspection_item_id: obj.id },
          order: { id: "ASC" },
        });
        option = { items };
        break;
      default:
        break;
    }

    obj.option = option;
    delete obj.min_digits;
    delete obj.max_digits;
    delete obj.decimal_point_digits;
    delete obj.unit;
    delete obj.future_date_flag;
    delete obj.max_future_days;
    delete obj.past_date_flag;
    delete obj.max_past_days;
    delete obj.label;
    delete obj.label_en;
    delete obj.value;
    delete obj.key_type;
    delete obj.key_type_1;
    delete obj.key_type_2;
    delete obj.image_size;

    return obj;
  }

  /**
   * @functionName store
   * @author vungpv93@gmail.com
   * @param auth
   * @param param
   * @rule
   * - Check input_type: 1->9
   */
  public async store(auth: IAuth, param: CreateBody): Promise<MstInspectionItemEntity> {
    await this.validGenericCode(param.category, auth);
    if (await this.__checkExists(param.name)) throw new AppException(ErrorCode.E110001);

    let obj = {
      category: param.category,
      name: param.name,
      name_en: param.name_en,
      short_name: param.short_name,
      short_name_en: param.short_name_en,
      input_type: param.input_type,
      created_by: auth.id,
      updated_by: auth.id,
    };

    switch (obj.input_type) {
      case InputTypeEnum.TextNumber:
      case InputTypeEnum.TextBox:
      case InputTypeEnum.Date:
      case InputTypeEnum.Image:
      case InputTypeEnum.OnOff:
      case InputTypeEnum.Dropdown:
      case InputTypeEnum.Coordinate:
        obj = { ...obj, ...param.option };
        break;
      default:
        break;
    }

    const entity = { ...obj, company_code: auth.company_code, created_by: auth.id, updated_by: auth.id };
    const result: MstInspectionItemEntity = await this.inspectionItemRepo.save(this.inspectionItemRepo.create(entity));

    if (obj.input_type === InputTypeEnum.Radio) {
      const radioItems: RadioItemOption[] = param.option?.items ?? [];
      await Promise.all(
        radioItems.map(async (opt: RadioItemOption): Promise<RadioOptionEntity> => {
          return this.radioOptionRepo.save(
            this.radioOptionRepo.create({
              ...opt,
              inspection_item_id: result.id,
              created_by: auth.id,
              updated_by: auth.id,
            }),
          );
        }),
      );
    }

    return await this.findOne(result.id);
  }

  /**
   * @functionName update
   * @author vungpv93@gmail.com
   * @param auth
   * @param id
   * @param param
   * @rule
   */
  public async update(auth: IAuth, id: number, param: UpdateBody): Promise<MstInspectionItemEntity> {
    await this.validGenericCode(param.category, auth);
    const obj = this.__makeItemObject(param);
    const entity: MstInspectionItemEntity = await this.findOne(id);
    if (entity.input_type !== obj.input_type) throw new AppException(ErrorCode.E110002);
    if (await this.__checkExists(param.name, id)) throw new AppException(ErrorCode.E110001);

    const entityObj = { ...entity, ...obj, updated_by: auth.id };
    const result: MstInspectionItemEntity = await this.inspectionItemRepo.save(
      this.inspectionItemRepo.create(entityObj),
    );

    // Handle Radio Opt.
    if (entity.input_type === InputTypeEnum.Radio) {
      const radioItems: RadioItemOption[] = param.option?.items ?? [];
      await this.__revokeRadioOpts(result.id, radioItems);
      await this.__saveRadioOptions(result.id, auth, radioItems);
    }
    return await this.findOne(result.id);
  }

  /**
   * @param inspection_item_id
   * @param items
   * @private __revokeRadioOpts
   */
  private async __revokeRadioOpts(inspection_item_id: number, items: RadioItemOption[]): Promise<void> {
    const itemIdList: number[] = map(
      filter(items, (o: RadioItemOption) => o.id),
      "id",
    );

    if (!isEmpty(itemIdList)) {
      await this.radioOptionRepo.delete({ inspection_item_id: inspection_item_id, id: Not(In(itemIdList)) });
    } else {
      await this.radioOptionRepo.delete({ inspection_item_id: inspection_item_id });
    }
  }

  /**
   * @param inspection_item_id
   * @param auth
   * @param items
   * @private __saveRadioOptions
   */
  private async __saveRadioOptions(inspection_item_id: number, auth: IAuth, items: RadioItemOption[]): Promise<void> {
    await Promise.all(
      items.map(async (opt: RadioItemOption): Promise<RadioOptionEntity> => {
        const obj = { ...opt, inspection_item_id: inspection_item_id, created_by: auth.id, updated_by: auth.id };
        if (opt.hasOwnProperty("id") && typeof opt.id !== undefined) {
          const entity: RadioOptionEntity = await this.radioOptionRepo.findOne({ where: { id: opt.id } });
          if (!entity) throw new AppException(ErrorCode.E101002); // TODO
          return this.radioOptionRepo.save(this.radioOptionRepo.create({ ...entity, ...obj }));
        } else {
          return this.radioOptionRepo.save(this.radioOptionRepo.create(obj));
        }
      }),
    );
  }

  /**
   * @param param
   * @private __makeItemObject
   */
  private __makeItemObject(param: UpdateBody) {
    let obj = {
      category: param.category,
      name: param.name,
      name_en: param.name_en,
      short_name: param.short_name,
      short_name_en: param.short_name_en,
      input_type: param.input_type,
    };

    switch (obj.input_type) {
      case InputTypeEnum.TextNumber:
      case InputTypeEnum.TextBox:
      case InputTypeEnum.Date:
      case InputTypeEnum.Image:
      case InputTypeEnum.OnOff:
      case InputTypeEnum.Dropdown:
      case InputTypeEnum.Coordinate:
        obj = { ...obj, ...param.option };
        break;
      default:
        break;
    }

    return obj;
  }

  /**
   * @functionName destroy
   * @author vungpv93@gmail.com
   * @param id
   */
  public async destroy(id: number): Promise<UpdateResult> {
    const obj: MstInspectionItemEntity = await this.findOne(id);
    // TODO check logic Destroy Inspection Item.
    return await this.inspectionItemRepo.softDelete({ id: obj.id });
  }

  /**
   * @param auth
   * @param category
   * @private checkCategory
   */
  private async validGenericCode(category: string, auth: IAuth): Promise<void> {
    // TODO: need check category from GenericCode.
    // await this.genericCodeService.findOneByCondition({
    //   company_code: auth.company_code,
    //   language: LocaleEnum.English,
    //   key_type: GenericCodeKey.InspectionItemsCategory,
    //   key_value: category,
    // });
  }
}
