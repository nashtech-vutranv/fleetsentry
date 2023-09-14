import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtConfig } from "../../constants/JwtConfig";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtConfig.secret,
      ignoreExpiration: true,
    });
  }

  /**
   * @param payload
   * @author vungpv93@gmail.com
   * @functionName validate
   */
  async validate(payload: any) {
    // TODO update logic validate access_token
    return {
      id: payload.authId,
      company_code: payload.company_code,
    };
  }
}
