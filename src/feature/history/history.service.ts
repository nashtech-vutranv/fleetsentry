import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as _ from "lodash";
import { UpdateHistoryEntity, UserEntity, InspectionTypeEntity } from "src/entities";
import { Repository } from "typeorm";
import { FilterInspectorHistoryDto, FilterUserHistoryDto } from "./dto";

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(UpdateHistoryEntity)
    private updateHistoryRepo: Repository<UpdateHistoryEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(InspectionTypeEntity)
    private inspectionTypeRepo: Repository<InspectionTypeEntity>,
  ) {}

  groupInspectorHistoriesData(
    histories: UpdateHistoryEntity[],
    users: UserEntity[],
    inspectionTypes: InspectionTypeEntity[],
  ) {
    const combineData = histories.map((history) => ({
      ...history,
      firstname: users.find((user) => user.id === history.updated_by).firstname,
      lastname: users.find((user) => user.id === history.updated_by).lastname,
      inspection_code: inspectionTypes.find((inspection) => inspection.id === history.inspection_type_id)
        .inspection_code,
    }));
    const groupedData = _.groupBy(combineData, (item) => `${item.seqn}_${item.updated_at}_${item.updated_by}`);
    const result = _.map(groupedData, (group) => {
      return {
        seqn: group[0].seqn,
        update_at: group[0].updated_at,
        username: `${group[0].firstname} ${group[0].lastname}`,
        data: group.map((item) => _.omit(item, ["seqn", "update_at", "firstname", "lastname", "updated_by"])),
      };
    });

    return result;
  }

  groupUserHistoriesData(
    histories: UpdateHistoryEntity[],
    users: UserEntity[],
    inspectionTypes: InspectionTypeEntity[],
  ) {
    const checkUserIsInspector = (user: UserEntity) => (user.inspector_flag === 1 ? false : true);
    const combineData = histories.map((history) => {
      const findUser = users.find((user) => user.id === history.updated_by);
      const findInspectionType = inspectionTypes.find(
        (inspectionType) => inspectionType.id === history.inspection_type_id,
      );
      return {
        ...history,
        firstname: findUser?.firstname || null,
        lastname: findUser?.lastname || null,
        inspection_code: findUser && checkUserIsInspector(findUser) ? findInspectionType.inspection_code : null,
      };
    });

    const groupedData = _.groupBy(combineData, (item) => `${item.updated_at}_${item.order_number}`);
    const result = _.map(groupedData, (group) => {
      return {
        updated_at: group[0].updated_at,
        order_number: group[0].order_number,
        vin_number: "TODO",
        data: group.map((item) => _.omit(item, ["seqn", "updated_at", "updated_by", "order_number"])),
      };
    });

    return result;
  }

  async getAllInspectorHistories(): Promise<any> {
    try {
      const allHistories = await this.updateHistoryRepo.find();
      const users = await this.userRepo.find();
      const inspectionTypes = await this.inspectionTypeRepo.find();
      return this.groupInspectorHistoriesData(allHistories, users, inspectionTypes);
    } catch (error) {
      throw error;
    }
  }

  async getAllUserHistories(): Promise<any> {
    try {
      const allHistories = await this.updateHistoryRepo.find();
      const users = await this.userRepo.find();
      const inspectionTypes = await this.inspectionTypeRepo.find();
      return this.groupUserHistoriesData(allHistories, users, inspectionTypes);
    } catch (error) {
      throw error;
    }
  }

  async getHistoriesByInspectorFilter(queryDto: FilterInspectorHistoryDto): Promise<any> {
    const { inspection_flag, inspection_type_id, order_number, from_date, to_date } = queryDto;
    const historyQuery = this.updateHistoryRepo.createQueryBuilder("history");

    if (!_.isEmpty(order_number)) {
      historyQuery.andWhere("history.order_number = :order_number", { order_number });
    }

    if (!_.isEmpty(inspection_type_id)) {
      historyQuery.andWhere("history.inspection_type_id = :inspection_type_id", { inspection_type_id });
    }

    if (!_.isEmpty(inspection_flag)) {
      inspection_flag === "d" &&
        historyQuery.andWhere("history.inspection_d_flag = :inspection_d_flag", { inspection_d_flag: 0 });
      inspection_flag === "h" &&
        historyQuery.andWhere("history.inspection_h_flag = :inspection_h_flag", { inspection_h_flag: 0 });
    }

    historyQuery.andWhere("history.updated_at BETWEEN :fromDate AND :toDate", { fromDate: from_date, toDate: to_date });
    return historyQuery.getMany();
  }

  async getHistoriesByUserFilter(queryDto: FilterUserHistoryDto): Promise<any> {
    const { order_number, from_date, to_date } = queryDto;
    const historyQuery = this.updateHistoryRepo.createQueryBuilder("history");
    if (!_.isEmpty(order_number)) {
      historyQuery.andWhere("history.order_number = :order_number", { order_number });
    }
    historyQuery.andWhere("history.updated_at BETWEEN :fromDate AND :toDate", { fromDate: from_date, toDate: to_date });
    return historyQuery.getMany();
  }

  async getFilterUser(queryDto: FilterInspectorHistoryDto | FilterUserHistoryDto): Promise<any> {
    const { username } = queryDto;
    const userQuery = this.userRepo.createQueryBuilder("user");

    if (!_.isEmpty(username)) {
      userQuery.where("user.lastname LIKE :query OR user.firstname LIKE :query", { query: `%${username}%` });
    }
    return userQuery.getMany();
  }

  async getInspectorHistories(queryDto: FilterInspectorHistoryDto): Promise<any> {
    const histories = await this.getHistoriesByInspectorFilter(queryDto);
    const users = await this.getFilterUser(queryDto);
    const inspectionTypes = await this.inspectionTypeRepo.find();
    return this.groupInspectorHistoriesData(histories, users, inspectionTypes);
  }

  async getUserHistories(queryDto: FilterUserHistoryDto): Promise<any> {
    const histories = await this.getHistoriesByUserFilter(queryDto);
    const users = await this.getFilterUser(queryDto);
    const inspectionTypes = await this.inspectionTypeRepo.find();
    return this.groupUserHistoriesData(histories, users, inspectionTypes);
  }
}
