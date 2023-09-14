import { Injectable } from "@nestjs/common";
import { InspectorQualificationEntity } from "src/entities";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class InspectorQualificationService {
  constructor(
    @InjectRepository(InspectorQualificationEntity)
    private inspectorQualificationRepository: Repository<InspectorQualificationEntity>,
  ) {}
}
