import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'leave', name: 'permissions' })
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', unique: true })
    name: string;

    @Column({ name: 'display_name' })
    displayName: string;

    @Column({ name: 'module' })
    module: string;

    @Column({ name: 'feature' })
    feature: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'active' })
    active: boolean;
}
