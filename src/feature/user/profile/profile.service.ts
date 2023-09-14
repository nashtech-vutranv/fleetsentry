import { Injectable } from "@nestjs/common";
import { UserService } from "../user.service";
import { IAuth } from "src/core/interface";
import { ProfileDto, SettingsProfileDto, UpdateProfileDto, UpdateSettingProfileDto, ChangePasswordDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericCodeEntity, UserEntity, MstProgramEntity } from "src/entities";
import { Repository } from "typeorm";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";
import { Password } from "src/utils";
import { GenericCodeService } from "src/feature/generic-code/generic-code.service";
import { GenericCodeKey } from "src/enums/generic-code";
@Injectable()
export class ProfileService {
  constructor(
    private userService: UserService,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(GenericCodeEntity) private genericCodeRepo: Repository<GenericCodeEntity>,
    @InjectRepository(MstProgramEntity) private mstProgramRepo: Repository<MstProgramEntity>,
    private genericCodeService: GenericCodeService,
  ) {}

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   * @param language
   */
  public async show(auth: IAuth, language: string): Promise<ProfileDto> {
    const profile = await this.userService.findOne(auth.id);

    const company_info = await this.genericCodeRepo.findOne({
      where: {
        company_code: auth.company_code,
        language: "ja", // TODO [VungPV]
        key_type: GenericCodeKey.CompanyCode,
      },
      select: { attribute1: true },
    });
    if (!company_info) throw new AppException(ErrorCode.E201002);
    return ProfileDto.plainToInstance({ ...profile, company_name: company_info.attribute1 });
  }

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   * @param updateData
   */
  public async update(auth: IAuth, updateData: UpdateProfileDto): Promise<ProfileDto> {
    const user = await this.userService.findOne(auth.id);
    const userUpdated = await this.userRepo.save({ ...user, ...updateData });
    return ProfileDto.plainToInstance(userUpdated);
  }

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   */
  public async showSetting(auth: IAuth): Promise<SettingsProfileDto> {
    return SettingsProfileDto.plainToInstance(await this.userService.findOne(auth.id));
  }

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   * @param updateData
   */
  public async updateSettingProfile(
    auth: IAuth,
    language: string,
    updateData: UpdateSettingProfileDto,
  ): Promise<SettingsProfileDto> {
    const user = await this.userService.findOne(auth.id);
    if (updateData.timezone_code) {
      await this.genericCodeService.findOneByCondition({
        company_code: auth.company_code,
        language: language,
        key_type: GenericCodeKey.TimezoneCode,
        key_value: updateData.timezone_code,
      });
    }

    if (updateData.start_program) {
      const mstProgram = await this.mstProgramRepo.findOneBy({ program_number: updateData.start_program });
      if (!mstProgram) throw new AppException(ErrorCode.E105000);
    }

    const userUpdated = await this.userRepo.save({ ...user, ...updateData });
    return SettingsProfileDto.plainToInstance(userUpdated);
  }

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   * @param changePassword
   */
  public async changePassword(auth: IAuth, changePassword: ChangePasswordDto): Promise<UserEntity> {
    const user = await this.userService.findOne(auth.id);
    const checkPwd = await Password.check(user.password, changePassword.current_password);
    if (!checkPwd) throw new AppException(ErrorCode.E101002);
    user.password = await Password.hash(changePassword.current_password);
    //TODO move access-token black list
    return await this.userRepo.save(user);
  }
}
