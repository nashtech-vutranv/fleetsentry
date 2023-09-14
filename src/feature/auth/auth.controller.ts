import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { LoginBody } from "./auth.dto";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * @url {baseUrl}/auth/login
   * @method POST
   * @param body
   * @param res
   * @author vungpv93@gmail.com
   * @functionName login
   */
  @Post("login")
  public async login(@Body() body: LoginBody, @Res() res: Response): Promise<any> {
    const result = await this.authService.login(body);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }
}
