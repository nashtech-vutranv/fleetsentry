import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity, RoleProgramEntity, UserEntity } from "src/entities";
import { Repository, DataSource, QueryRunner } from "typeorm";
import { RoleDto, RoleDetailDto, SearchRoleDTO, UpdateRoleDto } from "./dto";
import { IPaginateReq } from "src/core/decorators";
import { Paginate, ArrayUtil } from "src/utils";
import { ErrorCode } from "src/enums";
import { AppException } from "src/core/exceptions";
import { IAuth } from "src/core/interface";

/**
 * @Author vuducdung93@gmail.com
 */

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private roleRepository: Repository<RoleEntity>,
    @InjectRepository(RoleProgramEntity) private roleProgramRepository: Repository<RoleProgramEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async filter(auth: IAuth, paginateReq: IPaginateReq, search?: SearchRoleDTO): Promise<Paginate> {
    const rolesQuery = this.roleRepository
      .createQueryBuilder("role")
      .leftJoinAndMapOne("role.updated_by", UserEntity, "user", "user.id = role.updated_by")
      .where({ company_code: auth.company_code });

    if (search && search.search) rolesQuery.andWhere("LOWER(name) like :search", { search: `${search.search}%` });

    const take = paginateReq.size * paginateReq.page;
    rolesQuery.setFindOptions({
      take: take,
      skip: take - paginateReq.size,
    });
    const [roles, count] = await rolesQuery.getManyAndCount();
    return new Paginate(RoleDto.plainToInstance(roles), count, paginateReq.page, paginateReq.size);
  }

  /**
   * @author vuducdung93@gmail.com
   * @function findOne
   */
  public async findOne(auth: IAuth, id: number): Promise<RoleDetailDto> {
    return RoleDetailDto.plainToInstance(await this._findOne(auth.company_code, id));
  }
  /**
   * @author vuducdung93@gmail.com
   * @function update
   */
  public async update(auth: IAuth, id: number, updateData: UpdateRoleDto): Promise<RoleDetailDto> {
    updateData.items = ArrayUtil.mergeObjectsByKey(updateData.items, "id");

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const roleWithRolePrograms = await this._findOne(auth.company_code, id, queryRunner);

      const rolePrograms = roleWithRolePrograms.rolePrograms;
      delete roleWithRolePrograms.rolePrograms;
      let role = roleWithRolePrograms;

      if (updateData.items.length > 0) {
        const roleProgramsUpdated = await queryRunner.manager.save(
          updateData.items.map((itemUpdateData) => {
            const roleProgram = rolePrograms.find((item) => item.id === itemUpdateData.id);
            if (!roleProgram) throw new AppException(ErrorCode.E103001);
            return this.roleProgramRepository.create({ ...roleProgram, ...itemUpdateData, updated_by: auth.id });
          }),
        );
        //update user_updated
        role.updated_by = auth.id;
        role = await queryRunner.manager.save(role);

        role.rolePrograms = Array.from(
          new Map([...rolePrograms, ...roleProgramsUpdated].map((item) => [item.id, { ...item }])).values(),
        );
      } else {
        role.rolePrograms = rolePrograms;
      }

      await queryRunner.commitTransaction();
      return RoleDetailDto.plainToInstance(role);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // /**
  //  *
  //  * @author vuducdung93@gmail.com
  //  * @function destroy
  //  */
  // async destroy(company_code: string, id: number): Promise<boolean> {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     const role = await this._findOne(company_code, id, queryRunner);
  //     await queryRunner.manager.remove(role.rolePrograms);
  //     delete role.rolePrograms;
  //     await queryRunner.manager.remove(role);
  //     await queryRunner.commitTransaction();
  //     return true;
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  private async _findOne(company_code: string, id: number, queryRunner?: QueryRunner): Promise<RoleEntity> {
    const role = await this.roleRepository
      .createQueryBuilder("role", queryRunner)
      .leftJoinAndSelect("role.rolePrograms", "role-program")
      .where("role.id = :id", { id })
      .andWhere("role.company_code = :company_code", { company_code })
      .getOne();
    if (!role) throw new AppException(ErrorCode.E103000);
    return role;
  }
}
