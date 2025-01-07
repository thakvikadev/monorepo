import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { timestamps } from './timestamps';

export class UserHasRoleMigration1735978366656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_has_roles',
        columns: [
          { name: 'user_id', type: 'int', isPrimary: true },
          { name: 'role_id', type: 'int', isPrimary: true },
          ...timestamps,
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'user_has_roles',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'user_has_roles',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_has_roles');
  }
}
