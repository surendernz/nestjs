import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Property {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column()
    name!: string;
    @Column()
    description!: string;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price!: number;
    @Column()
    location!: string;
}