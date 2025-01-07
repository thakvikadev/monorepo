import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import { timestamps } from './timestamps';

export class UserMigration1735976901548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uuid',
            type: 'uuid',
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            generatedType: 'STORED',
            isNullable: true,
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
            length: '50',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            length: '50',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
            length: '25',
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dob',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'marital_status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nationality',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'id_type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'id_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reset_token_expiry',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'is_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'verification_token',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reset_token',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'token',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'last_login_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'last_login_ip',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
          },
          ...timestamps,
        ],
      }),
    );
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_UUID',
        columnNames: ['uuid'],
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_NAME',
        columnNames: ['username'],
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_EMAIL',
        columnNames: ['email'],
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_PHONE',
        columnNames: ['phone'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'IDX_USER_UUID');
    await queryRunner.dropIndex('users', 'IDX_USER_NAME');
    await queryRunner.dropIndex('users', 'IDX_USER_EMAIL');
    await queryRunner.dropIndex('users', 'IDX_USER_PHONE');
    await queryRunner.dropTable('users');
  }
}
