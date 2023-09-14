import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateErpOrderDetailTable1694304532226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "order_detail",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "order_header_id", type: "int" },
          { name: "inspection_code", type: "varchar", length: "50" },
          { name: "item", type: "int", isNullable: true, default: null },
          { name: "quantity", type: "int", isNullable: true, default: null },
          { name: "description", type: "varchar", length: "50", isNullable: true, default: null },
          { name: "price", type: "int", isNullable: true, default: null },
          { name: "options", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "rate", type: "int", isNullable: true, default: null },
          { name: "amount", type: "int", isNullable: true, default: null },
          { name: "taxrate2", type: "int", isNullable: true, default: null },
          { name: "taxcode", type: "int", isNullable: true, default: null },
          { name: "grossamt", type: "int", isNullable: true, default: null },
          { name: "tax2amt", type: "int", isNullable: true, default: null },
          { name: "department", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "custcol_sw_jv_IC_LNK_FG", type: "int", isNullable: true, default: null },
          { name: "isclosed", type: "smallint", isNullable: true, default: null },
          { name: "custcol_sw_jv_INS_INV_FG", type: "smallint", isNullable: true, default: null },
          { name: "custcol_sw_jv_RQS_INS_DT_FR", type: "date", isNullable: true, default: null },
          { name: "custcol_sw_jv_RQS_INS_DT_TO", type: "date", isNullable: true, default: null },
          { name: "custcol_sw_jv_RQS_INS_FLD", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "custcol_sw_jv_RQS_INS_CST_ADR", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "custcol_sw_jv_INS_FLG_RSN_CD", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "custcol_sw_jv_INS_FLG", type: "smallint", isNullable: true, default: null },
          { name: "custcol_sw_jv_INS_CMT", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "custcol_sw_jv_INS_RST_CD", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "custcol_sw_jv_INS_CMP_DT", type: "date", isNullable: true, default: null },
          { name: "custcol_sw_jv_INS_RST_DESC", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "custcol_sw_jv_ACT_INS_PIC_CD", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "custcol_sw_jv_ACT_INS_RST_CD", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "custcol_sw_jv_INV_ISU_FG", type: "smallint", isNullable: true, default: null },
          { name: "custcol_sw_jv_INV_NG_FG", type: "smallint", isNullable: true, default: null },
          { name: "custcol_sw_jv_ACC_CD", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "custcol_sw_jv_INV_CMT", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "custcol_sw_jv_INV_CMP_FG", type: "smallint", isNullable: true, default: null },
          { name: "custcol_sw_jv_INV_TMG_CD", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "custcol_sw_jv_SVC_CMP_DT", type: "date", isNullable: true, default: null },
          { name: "custcol_sw_jv_ORI_PRO_PLC", type: "smallint", isNullable: true, default: null },
          { name: "created_by", type: "int", isNullable: true, default: null },
          { name: "updated_by", type: "int", isNullable: true, default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("order_detail");
  }
}
