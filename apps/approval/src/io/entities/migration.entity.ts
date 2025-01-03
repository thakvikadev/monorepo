import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'approval', name: 'migrations' })
export class Migration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  timestamp: number;

  @Column({ name: 'name' })
  name: string;
}
