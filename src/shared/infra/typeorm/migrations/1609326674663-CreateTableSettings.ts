import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTableSettings1609326674663
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'settings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'location',
            type: 'varchar',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'subtitle1',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description1',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'subtitle2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description2',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'subtitle3',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description3',
            type: 'text',
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
            name: 'SettingsOfUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('settings');
  }
}
