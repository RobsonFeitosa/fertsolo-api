import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldDensidadeSolo1615212053633
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'report_liming_plastering',
      new TableColumn({
        name: 'tb_9_estoque_de_carbono_densidade_solo',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'report_liming_plastering',
      'tb_9_estoque_de_carbono_densidade_solo',
    );
  }
}
