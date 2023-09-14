import { Controller, Get, Res, UseGuards, HttpStatus, Put, Body, Patch } from "@nestjs/common";
import { Auth, Locale } from "src/core/decorators";
import { IAuth } from "src/core/interface";
import { Response } from "express";
import { AppGuard } from "src/core/guard";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProfileService } from "./profile.service";
import { ProfileDto, SettingsProfileDto, UpdateProfileDto, ChangePasswordDto, UpdateSettingProfileDto } from "./dto";

@Controller("profile")
@UseGuards(AppGuard)
@ApiTags("[IC-9000] - Profile")
@ApiBearerAuth()
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  /**
   * IC-9010
   * @author vuducdung93@gmail.com
   * @url {baseUrl}/profile/
   * @function show
   */
  @Get("/")
  @ApiOperation({ summary: "detail profile" })
  @ApiOkResponse({
    type: ProfileDto,
  })
  public async show(@Auth() auth: IAuth, @Locale() language: string, @Res() res: Response) {
    const result = await this.profileService.show(auth, language);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-9010
   * @author vuducdung93@gmail.com
   * @url {baseUrl}/profile/
   * @function update
   */
  @Put("/")
  @ApiOperation({ summary: "update profile" })
  @ApiOkResponse({ type: ProfileDto })
  public async update(@Auth() auth: IAuth, @Body() body: UpdateProfileDto, @Res() res: Response) {
    const result = await this.profileService.update(auth, body);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-9020
   * @author vuducdung93@gmail.com
   * @url {baseUrl}/profile/setting
   * @function showSetting
   */
  @Get("/setting")
  @ApiOperation({ summary: "setting profile" })
  @ApiOkResponse({ type: SettingsProfileDto })
  public async showSetting(@Auth() auth: IAuth, @Res() res: Response) {
    const result = await this.profileService.showSetting(auth);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-9020
   * @author vuducdung93@gmail.com
   * @url {baseUrl}/profile/setting
   * @function updateSettingsProfile
   */
  @Put("/setting")
  @ApiOperation({ summary: "update settings profile" })
  @ApiOkResponse({ type: SettingsProfileDto })
  public async updateSetting(
    @Auth() auth: IAuth,
    @Locale() language: string,
    @Body() body: UpdateSettingProfileDto,
    @Res() res: Response,
  ) {
    const result = await this.profileService.updateSettingProfile(auth, language, body);
    return res.status(HttpStatus.OK).json({
      status: true,
      data: result,
    });
  }

  /**
   * IC-9030
   * @author vuducdung93@gmail.com
   * @url {baseUrl}/profile/change-password
   * @function updatePassword
   */
  @Put("/change-password")
  @ApiOperation({ summary: "change password" })
  public async updatePassword(@Auth() auth: IAuth, @Body() body: ChangePasswordDto, @Res() res: Response) {
    await this.profileService.changePassword(auth, body);
    return res.status(HttpStatus.OK).json({
      status: true,
    });
  }
}
