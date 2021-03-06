import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateReportLimingPlastering1601676011181
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'report_liming_plastering',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'description_cuture',
            type: 'varchar',
          },
          {
            name: 'tb_1_description_deep_culture',
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
            isNullable: true,
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
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'uf',
            type: 'varchar',
          },
          {
            name: 'objective_culture',
            type: 'varchar',
            isNullable: true,
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
            name: 'LimingPlasteringUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('report_liming_plastering');
  }
}
