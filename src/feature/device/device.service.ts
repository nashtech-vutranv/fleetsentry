import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeviceEntity } from "src/entities";
import { Repository } from "typeorm";
import { DeviceDto } from "./dto";

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private deviceRepo: Repository<DeviceEntity>,
  ) {}

  async updateDevice(device: DeviceEntity, deviceDto: DeviceDto): Promise<any> {
    Object.assign(device, deviceDto);
    device.updated_by = deviceDto.user_id;
    return await this.deviceRepo.save(device);
  }

  async registerDeviceWithoutToken(deviceDto: DeviceDto): Promise<any> {
    const device = await this.deviceRepo.findOne({ where: { uuid: deviceDto.uuid } });
    if (device) {
      return await this.updateDevice(device, deviceDto);
    }
    const newDevice = this.deviceRepo.create({
      ...deviceDto,
      user_id: null,
      created_by: deviceDto.user_id,
    });
    return await this.deviceRepo.save(newDevice);
  }

  async registerDeviceWithToken(deviceDto: DeviceDto): Promise<any> {
    const device = await this.deviceRepo.findOne({ where: { uuid: deviceDto.uuid } });
    if (device) {
      return this.updateDevice(device, deviceDto);
    }
    const newDevice = this.deviceRepo.create(deviceDto);
    newDevice.created_by = deviceDto.user_id;
    return await this.deviceRepo.save(newDevice);
  }
}
