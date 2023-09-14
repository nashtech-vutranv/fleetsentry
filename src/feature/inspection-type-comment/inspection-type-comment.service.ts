import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "src/entities";
import { Like, Repository } from "typeorm";
import { Paginate } from "src/utils";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";
import { IAuth } from "src/core/interface";
import { plainToClass } from "class-transformer";
import { IPaginateReq } from "src/core/decorators";
import {
  CreateInspectionTypeCommentDto,
  IndexInspectionTypeCommentDto,
  UpdateInspectionTypeCommentDto,
} from "./inspection-type-comment.dto";

@Injectable()
export class InspectionTypeCommentService {
  constructor(@InjectRepository(CommentEntity) private inspectionTypeCommentRepo: Repository<CommentEntity>) {}

  /**
   * @author nvtoan27101994@gmail.com
   * @functionName index
   * @description
   */
  public async index(filterRequest: IndexInspectionTypeCommentDto, pagination: IPaginateReq): Promise<any> {
    const queryBuilder = this.inspectionTypeCommentRepo
      .createQueryBuilder("inspection_type_comments")
      .select(["inspection_type_comments.*"]);

    if (filterRequest.id) {
      queryBuilder.andWhere({
        id: filterRequest.id,
      });
    }

    if (filterRequest.inspection_type_id) {
      queryBuilder.andWhere({
        inspection_type_id: filterRequest.inspection_type_id,
      });
    }

    if (filterRequest.inspection_result_code) {
      queryBuilder.andWhere({
        inspection_result_code: filterRequest.inspection_result_code,
      });
    }

    if (filterRequest.name) {
      queryBuilder.andWhere({
        name: Like(filterRequest.name),
      });
    }

    if (filterRequest.content) {
      queryBuilder.andWhere({
        content: Like(filterRequest.content),
      });
    }

    if (filterRequest.system_flag) {
      queryBuilder.andWhere({
        system_flag: filterRequest.system_flag,
      });
    }

    if (filterRequest.inspector_id) {
      queryBuilder.andWhere({
        inspector_id: filterRequest.inspector_id,
      });
    }

    filterRequest.sortField = filterRequest.sortField || "id";

    const { page, size } = pagination;
    const take = size;
    const skip = (page - 1) * size;

    const [list, total] = await Promise.all([
      queryBuilder
        .orderBy(`inspection_type_comments.${filterRequest.sortField}`, filterRequest.sortType)
        .skip(skip)
        .take(take)
        .getRawMany(),

      queryBuilder.getCount(),
    ]);

    return new Paginate(list, total, page, size);
  }

  /**
   * @author nvtoan27101994@gmail.com
   * @functionName findOne
   * @description
   */
  public async findOne(id: number): Promise<CommentEntity> {
    const item = await this.inspectionTypeCommentRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!item) throw new AppException(ErrorCode.E150000);

    return item;
  }

  /**
   * @functionName store
   * @author nvtoan27101994@gmail.com
   * @param auth
   * @param param
   * @rule
   */
  public async store(auth: IAuth, createRequest: CreateInspectionTypeCommentDto): Promise<CommentEntity> {
    // TODO : Need check inspection_type_comment is valid
    // const checkItem = await this.inspectionTypeCommentRepo.findOne({
    //   where: {
    //     inspection_type_id: createRequest.inspection_type_id,
    //   },
    // });

    // if (!checkItem) throw new AppException(ErrorCode.E150001);

    const item = plainToClass(CommentEntity, createRequest, {
      ignoreDecorators: true,
    });

    item.created_by = auth?.id;
    item.updated_by = auth?.id;

    return await this.inspectionTypeCommentRepo.save(item);
  }

  /**
   * @functionName update
   * @author nvtoan27101994@gmail.com
   * @param auth
   * @param id
   * @param param
   * @rule
   */
  public async update(auth: IAuth, id: number, updateRequest: UpdateInspectionTypeCommentDto): Promise<CommentEntity> {
    const checkItem = await this.findOne(id);

    const item = plainToClass(
      CommentEntity,
      { ...checkItem, ...updateRequest },
      { ignoreDecorators: true, exposeUnsetFields: false },
    );

    item.updated_by = auth?.id;

    return await this.inspectionTypeCommentRepo.save(item);
  }

  /**
   * @functionName destroy
   * @author nvtoan27101994@gmail.com
   * @param id
   */
  public async destroy(id: number) {
    const checkItem = await this.findOne(id);

    return await this.inspectionTypeCommentRepo.delete({ id: checkItem.id });
  }
}
