import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { timestamps } from './timestamps';

export class PermissionMigration1735975331479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permissions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'required',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'display_name',
            type: 'varchar',
          },
          {
            name: 'group',
            type: 'varchar',
            length: '25',
            isNullable: true,
          },
          {
            name: 'module',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'feature',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          ...timestamps,
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'permissions',
      new TableForeignKey({
        columnNames: ['required'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permissions',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permissions');
  }
}
