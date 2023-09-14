import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { LoginBody } from "./auth.dto";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";
import { Password } from "src/utils";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>, private jwtService: JwtService) {}

  /**
   * @author vungpv93@gmail.com
   * @functionName login
   * @param param
   * @example
   * {
   *   company_code: "string",
   *   username: "admin@example.com",
   *   password: "password",
   * }
   */
  public async login(param: LoginBody): Promise<{ access_token: string }> {
    const { company_code, username } = param;
    const user: UserEntity | null = await this.userRepo.findOne({
      where: { company_code: company_code, email: username },
    });

    if (!user) throw new AppException(ErrorCode.E101001);

    const checkPwd = await Password.check(user.password, param.password);
    if (!checkPwd) throw new AppException(ErrorCode.E101002);

    // TODO: Check device, check IP.

    if (user.getLockedFlag) throw new AppException(ErrorCode.E101003);

    const accessToken = await this.jwtService.signAsync({ authId: user?.id, company_code: user?.company_code });
    return {
      access_token: accessToken,
    };
  }
}
