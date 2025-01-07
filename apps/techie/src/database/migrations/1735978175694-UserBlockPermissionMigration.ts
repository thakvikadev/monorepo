import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { timestamps } from './timestamps';

export class UserBlockPermissionMigration1735978175694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_block_permissions',
        columns: [
          { name: 'user_id', type: 'int', isPrimary: true },
          { name: 'permission_id', type: 'int', isPrimary: true },
          ...timestamps,
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'user_block_permissions',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'user_block_permissions',
      new TableForeignKey({
        columnNames: ['permission_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permissions',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_block_permissions');
  }
}
