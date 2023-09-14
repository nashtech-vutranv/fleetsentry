import { Command, CommandRunner, Option } from "nest-commander";
import { InjectRepository } from "@nestjs/typeorm";
import {
  GenericCodeEntity,
  MstProgramEntity,
  RoleEntity,
  UserEntity,
  DrawingEntity,
  TodoEntity,
  AreaScheduleStandardEntity,
  CertificateEntity,
} from "../entities";
import { Repository } from "typeorm";
import { GenericCodeKey } from "../enums/generic-code";

@Command({ name: "install" })
export class InstallCommand extends CommandRunner {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(MstProgramEntity) private programRepo: Repository<MstProgramEntity>,
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
    @InjectRepository(GenericCodeEntity) private genericCodeRepo: Repository<GenericCodeEntity>,
    @InjectRepository(DrawingEntity) private drawingRepo: Repository<DrawingEntity>,
    @InjectRepository(TodoEntity) private todoRepo: Repository<TodoEntity>,
    @InjectRepository(CertificateEntity) private certificateRepo: Repository<CertificateEntity>,
    @InjectRepository(AreaScheduleStandardEntity)
    private areaScheduleStandardRepo: Repository<AreaScheduleStandardEntity>,
  ) {
    super();
  }

  public password = "$2b$10$OpkB0YhLq3Mp1uUs6dzQSOCavCvITMK1hrUw7UQr9RVSBhB38UUza"; // Admin@2023
  public CompanyCode = "9300";

  /**
   * @param passedParam
   * @param options
   */
  public async run(passedParam: string[], options?: Record<string, any>): Promise<void> {
    console.log("Running install command");

    if (options?.mode !== undefined && options?.mode !== null) {
      const { mode } = options;

      switch (mode) {
        case "user":
          await this.user();
          break;
        case "programs":
          await this.programs();
          break;
        case "roles":
          await this.roles();
          break;
        case "generic-code":
          await this.genericCode();
          break;
        case "drawing":
          await this.drawings();
          break;
        case "todo":
          await this.fakerTodo();
          break;
        case "area-schedule-standard":
          await this.areaScheduleStandard();
          break;
        case "certificates":
          await this.certificates();
          break;

        default:
          console.log("Skip");
          break;
      }
    }
    process.exit(1);
  }

  @Option({
    flags: "-s, --mode [string]",
    description: "The mode option setup data",
  })
  parseMode(val: string): string {
    return val;
  }

  /**
   * @author vungpv93@gmail.com
   * @private user
   */
  private async user(): Promise<void> {
    await this.userRepo.save(
      this.userRepo.create({
        company_code: "9300",
        inspector_flag: 0,
        lock_flag: 0,
        user_type_code: null,
        lastname: "Admin",
        firstname: "Account",
        email: "admin@example.com",
        password: this.password,
      }),
    );
  }

  /**
   * @author vungpv93@gmail.com
   * @private programs
   */
  private async programs(): Promise<void> {
    const data = [
      {
        program_name: "IC-1000",
        program_name_en: "IC-1000 (en)",
        program_number: "IC.1000",
        read_permission_flag: true,
        create_permission_flag: true,
        update_permission_flag: true,
        delete_permission_flag: true,
        download_permission_flag: true,
        system_flag: false,
      },
      {
        program_name: "IC-2000",
        program_name_en: "IC-2000 (en)",
        program_number: "IC.2000",
        read_permission_flag: true,
        create_permission_flag: true,
        update_permission_flag: true,
        delete_permission_flag: true,
        download_permission_flag: true,
        system_flag: false,
      },
      {
        program_name: "IC-1000",
        program_name_en: "IC-1000 (en)",
        program_number: "IC.1000",
        read_permission_flag: true,
        create_permission_flag: true,
        update_permission_flag: true,
        delete_permission_flag: true,
        download_permission_flag: true,
        system_flag: false,
      },
      {
        program_name: "IC-3000",
        program_name_en: "IC-3000 (en)",
        program_number: "IC.3000",
        read_permission_flag: true,
        create_permission_flag: true,
        update_permission_flag: true,
        delete_permission_flag: true,
        download_permission_flag: true,
        system_flag: false,
      },
      {
        program_name: "IC-4000",
        program_name_en: "IC-4000 (en)",
        program_number: "IC.4000",
        read_permission_flag: true,
        create_permission_flag: true,
        update_permission_flag: true,
        delete_permission_flag: true,
        download_permission_flag: true,
        system_flag: false,
      },
    ];

    for await (const obj of data) {
      console.log("object is ", obj);
      const checked = await this.programRepo.findOne({ where: { program_number: obj.program_number } });
      if (!checked) {
        await this.programRepo.save(this.programRepo.create(obj));
      }
    }
  }

  /**
   * @author vungpv93@gmail.com
   * @private roles
   */
  private async roles(): Promise<void> {
    // https://inspection-wwd2625.slack.com/archives/C05HKLG2U4W/p1691651021530889?thread_ts=1691650379.494679&cid=C05HKLG2U4W
    const roles = [
      "1CS課",
      "2CS課管理者（M）",
      "3検査事業場  (検査員G）",
      "4検査事業場場（検査員M）",
      "5検査事業場管理者（GM）",
      "6品質管理",
      "7品質管理管理者",
      "8経理",
      "9経理管理者",
      "⑩JEVIC経営陣",
      "⑪マスター管理A（一般）",
      "⑫マスター管理B（重要）",
      "⑬JEVIC　IT部門",
      "⑭システム管理者",
    ];

    for await (const name of roles) {
      console.log("role name is ", name);
      const checked = await this.roleRepo.findOne({ where: { name: name } });
      if (!checked) {
        await this.roleRepo.save(
          this.roleRepo.create({
            company_code: "9300",
            name: name,
          }),
        );
      }
    }
  }

  /**
   * @private genericCode
   */
  private async genericCode(): Promise<void> {
    const data = [
      {
        key: "company_code",
        values: [
          {
            value: "JEVIC",
            attribute1: "JEVIC LTD",
            order: 1,
          },
        ],
      },
      {
        key: "Faker",
        values: [
          {
            value: "faker-1",
            attribute1: "faker-value-1",
            order: 1,
          },
          {
            value: "faker-2",
            attribute1: "faker-value-2",
            order: 2,
          },
          {
            value: "faker-3",
            attribute1: "faker-value-3",
            order: 3,
          },
        ],
      },
      {
        key: "category_code",
        values: [
          {
            value: "category_code-1",
            attribute1: "category_code-label-1",
            order: 1,
          },
          {
            value: "category_code-2",
            attribute1: "category_code-label-2",
            order: 2,
          },
          {
            value: "category_code-3",
            attribute1: "category_code-label-3",
            order: 3,
          },
        ],
      },
      {
        key: "group_code",
        values: [
          {
            value: "group_code-1",
            attribute1: "group_code-label-1",
            order: 1,
          },
          {
            value: "group_code-2",
            attribute1: "group_code-label-2",
            order: 2,
          },
          {
            value: "group_code-3",
            attribute1: "group_code-label-3",
            order: 3,
          },
        ],
      },
      {
        key: "user_type_code",
        values: [
          {
            value: "user_type_code-1",
            attribute1: "user_type_code-label-1",
            order: 1,
          },
          {
            value: "user_type_code-2",
            attribute1: "user_type_code-label-2",
            order: 2,
          },
          {
            value: "user_type_code-3",
            attribute1: "user_type_code-label-3",
            order: 3,
          },
        ],
      },
      {
        key: "inspector_type_code",
        values: [
          {
            value: "type_code-1",
            attribute1: "type_code-label-1",
            order: 1,
          },
          {
            value: "type_code-2",
            attribute1: "type_code-label-2",
            order: 2,
          },
          {
            value: "type_code-3",
            attribute1: "type_code-label-3",
            order: 3,
          },
        ],
      },
      {
        key: "area_code",
        values: [
          {
            value: "area_code-1",
            attribute1: "area_code-label-1",
            order: 1,
          },
          {
            value: "area_code-2",
            attribute1: "area_code-label-2",
            order: 2,
          },
          {
            value: "area_code-3",
            attribute1: "area_code-label-3",
            order: 3,
          },
        ],
      },
      {
        key: "timezone_code",
        values: [
          {
            value: "timezone_code-1",
            attribute1: "timezone_code-label-1",
            order: 1,
          },
          {
            value: "timezone_code-2",
            attribute1: "timezone_code-label-2",
            order: 2,
          },
          {
            value: "timezone_code-3",
            attribute1: "timezone_code-label-3",
            order: 3,
          },
        ],
      },
      {
        key: "ins_result_code",
        values: [
          {
            value: "ins_result_code-1",
            attribute1: "ins_result_code-label-1",
            order: 1,
          },
          {
            value: "ins_result_code-2",
            attribute1: "ins_result_code-label-2",
            order: 2,
          },
          {
            value: "ins_result_code-3",
            attribute1: "ins_result_code-label-3",
            order: 3,
          },
        ],
      },
      {
        key: GenericCodeKey.InspectionItemsCategory,
        values: [
          {
            value: "ins_item_category-1",
            attribute1: "ins_item_category-label-1",
            order: 1,
          },
          {
            value: "ins_item_category-2",
            attribute1: "ins_item_category-label-2",
            order: 2,
          },
          {
            value: "ins_item_category-3",
            attribute1: "ins_item_category-label-3",
            order: 3,
          },
        ],
      },
    ];

    for await (const item of data) {
      for await (const obj of item.values) {
        for await (const locale of ["ja", "en"]) {
          console.log("Thong tin object is : ", {
            company_code: this.CompanyCode,
            language: locale,
            key_type: item.key,
            key_value: obj.value,
            attribute1: obj.attribute1,
            order: obj.order,
          });

          const entity = await this.genericCodeRepo.findOne({
            where: {
              company_code: this.CompanyCode,
              language: locale,
              key_type: item.key,
              key_value: obj.value,
            },
          });
          if (!entity) {
            await this.genericCodeRepo.save(
              this.genericCodeRepo.create({
                company_code: this.CompanyCode,
                language: locale,
                key_type: item.key,
                key_value: obj.value,
                attribute1: obj.attribute1,
                order: obj.order,
              }),
            );
          }
        }
      }
    }
  }

  private async fakerGenericCode(): Promise<void> {
    console.log("Running [fakerGenericCode] ", Object.values(GenericCodeKey as any));
  }
  /**
   * @author vungpv93@gmail.com
   * @functionName drawings
   * @private drawings
   */
  private async drawings(): Promise<void> {
    const items = [
      {
        company_code: this.CompanyCode,
        name: "Drawing 01",
        name_en: "Drawing 01",
      },
      {
        company_code: this.CompanyCode,
        name: "Drawing 02",
        name_en: "Drawing 02",
      },
    ];

    for await (const item of items) {
      const entity = await this.drawingRepo.findOne({ where: { name: item.name } });
      if (!entity) {
        await this.drawingRepo.save(this.drawingRepo.create({ ...item }));
      }
    }
  }

  private async fakerTodo(): Promise<void> {
    for (const item of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) {
      const entity = await this.todoRepo.findOne({ where: { id: item } });
      if (!entity) {
        await this.todoRepo.save(
          this.todoRepo.create({
            name: `name is ${item}`,
            sapo: `name is ${item}`,
            status: 1,
          }),
        );
      }
    }
  }

  /**
   *
   * @private
   */
  private async areaScheduleStandard(): Promise<void> {
    console.log("Running areaScheduleStandard()");
    const items = [
      {
        company_code: "9300",
        area_code: "area_code-1",
        monday_standard_time_from: "09:00",
        monday_standard_time_to: "17:00",
        tuesday_standard_time_from: "09:00",
        tuesday_standard_time_to: "17:00",
        wednesday_standard_time_from: "09:00",
        wednesday_standard_time_to: "17:00",
        thursday_standard_time_from: "09:00",
        thursday_standard_time_to: "17:00",
        friday_standard_time_from: "09:00",
        friday_standard_time_to: "17:00",
        saturday_standard_time_from: null,
        saturday_standard_time_to: null,
        sunday_standard_time_from: null,
        sunday_standard_time_to: null,
      },
      {
        company_code: "9300",
        area_code: "area_code-2",
        monday_standard_time_from: "09:00",
        monday_standard_time_to: "17:00",
        tuesday_standard_time_from: "09:00",
        tuesday_standard_time_to: "17:00",
        wednesday_standard_time_from: "09:00",
        wednesday_standard_time_to: "17:00",
        thursday_standard_time_from: "09:00",
        thursday_standard_time_to: "17:00",
        friday_standard_time_from: "09:00",
        friday_standard_time_to: "17:00",
        saturday_standard_time_from: null,
        saturday_standard_time_to: null,
        sunday_standard_time_from: null,
        sunday_standard_time_to: null,
      },
      {
        company_code: "9300",
        area_code: "area_code-3",
        monday_standard_time_from: "09:00",
        monday_standard_time_to: "17:00",
        tuesday_standard_time_from: "09:00",
        tuesday_standard_time_to: "17:00",
        wednesday_standard_time_from: "09:00",
        wednesday_standard_time_to: "17:00",
        thursday_standard_time_from: "09:00",
        thursday_standard_time_to: "17:00",
        friday_standard_time_from: "09:00",
        friday_standard_time_to: "17:00",
        saturday_standard_time_from: null,
        saturday_standard_time_to: null,
        sunday_standard_time_from: null,
        sunday_standard_time_to: null,
      },
    ];

    for (const item of items) {
      const model: AreaScheduleStandardEntity = await this.areaScheduleStandardRepo.findOne({
        where: {
          company_code: item.company_code,
          area_code: item.area_code,
        },
      });

      if (!model) await this.areaScheduleStandardRepo.save(this.areaScheduleStandardRepo.create(item));
    }
  }

  /**
   * @private
   */
  private async certificates(): Promise<void> {
    const data = [
      {
        name: "CERT-001",
      },
      {
        name: "CERT-002",
      },
      {
        name: "CERT-003",
      },
      {
        name: "CERT-004",
      },
      {
        name: "CERT-005",
      },
    ];

    for await (const obj of data) {
      console.log("object is ", obj);
      const checked: CertificateEntity = await this.certificateRepo.findOne({ where: { name: obj.name } });
      if (!checked) {
        await this.certificateRepo.save(this.certificateRepo.create(obj));
      }
    }
  }
}
