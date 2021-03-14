import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeTypeFieldsLimingPlastering1615335481890
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('report_liming_plastering', [
      {
        oldColumn: new TableColumn({
          name: 'tb_1_clay',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_1_clay',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_1_silt',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_1_silt',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_1_sand',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_1_sand',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_2_m_o',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_2_m_o',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_2_ph',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_2_ph',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_p_fosforo',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_p_fosforo',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_k_potassio',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_k_potassio',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_na_sodio',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_na_sodio',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_s_enxofre',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_s_enxofre',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_b_boro',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_b_boro',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_cu_cobre',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_cu_cobre',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_fe_ferro',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_fe_ferro',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_mn_manganes',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_mn_manganes',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_zn_zinco',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_zn_zinco',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_4_ca_calcio',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_4_ca_calcio',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_4_mg_magnesio',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_4_mg_magnesio',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_4_al_aluminio',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_4_al_aluminio',
          type: 'decimal',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_4_h_al_acidez_potencial',
          type: 'varchar',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_4_h_al_acidez_potencial',
          type: 'decimal',
          isNullable: true,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('report_liming_plastering', [
      {
        oldColumn: new TableColumn({
          name: 'tb_1_clay',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_1_clay',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_1_silt',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_1_silt',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_1_sand',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_1_sand',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_2_m_o',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_2_m_o',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_2_ph',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_2_ph',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_p_fosforo',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_p_fosforo',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_k_potassio',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_k_potassio',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_na_sodio',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_na_sodio',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_s_enxofre',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_s_enxofre',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_b_boro',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_b_boro',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_cu_cobre',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_cu_cobre',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_fe_ferro',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_fe_ferro',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_mn_manganes',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_mn_manganes',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_3_zn_zinco',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_3_zn_zinco',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_4_ca_calcio',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_4_ca_calcio',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_4_mg_magnesio',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_4_mg_magnesio',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_4_al_aluminio',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_4_al_aluminio',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'tb_4_h_al_acidez_potencial',
          type: 'decimal',
          isNullable: true,
        }),
        newColumn: new TableColumn({
          name: 'tb_4_h_al_acidez_potencial',
          type: 'varchar',
          isNullable: true,
        }),
      },
    ]);
  }
}
