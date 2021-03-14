import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTableUnitys1615328910517
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'unitysLimingPlastering',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'report_id',
            type: 'varchar',
          },
          {
            name: 'tb_1_clay',
            type: 'varchar',
          },
          {
            name: 'tb_1_silt',
            type: 'varchar',
          },
          {
            name: 'tb_1_sand',
            type: 'varchar',
          },
          {
            name: 'tb_2_m_o',
            type: 'varchar',
          },
          {
            name: 'tb_2_ph',
            type: 'varchar',
          },
          {
            name: 'tb_3_p_fosforo',
            type: 'varchar',
          },
          {
            name: 'tb_3_k_potassio',
            type: 'varchar',
          },
          {
            name: 'tb_3_na_sodio',
            type: 'varchar',
          },
          {
            name: 'tb_3_s_enxofre',
            type: 'varchar',
          },
          {
            name: 'tb_3_b_boro',
            type: 'varchar',
          },
          {
            name: 'tb_3_cu_cobre',
            type: 'varchar',
          },
          {
            name: 'tb_3_fe_ferro',
            type: 'varchar',
          },
          {
            name: 'tb_3_mn_manganes',
            type: 'varchar',
          },
          {
            name: 'tb_3_zn_zinco',
            type: 'varchar',
          },
          {
            name: 'tb_4_ca_calcio',
            type: 'varchar',
          },
          {
            name: 'tb_4_mg_magnesio',
            type: 'varchar',
          },
          {
            name: 'tb_4_al_aluminio',
            type: 'varchar',
          },
          {
            name: 'tb_4_h_al_acidez_potencial',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'UnitysOfReport',
            referencedTableName: 'report_liming_plastering',
            referencedColumnNames: ['id'],
            columnNames: ['report_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('unitysLimingPlastering');
  }
}
