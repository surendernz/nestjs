import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;
    @Column()
    firstName!: string;
    @Column()
    lastName!: string;
    @Column({ unique: true })
    email!: string;
    @Column()
    avatarUrl!: string;
    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => Property, (property) => property.user)
    properties!: Property[];
    //this is a list of properties associated with the user.
    // The inverse side of the relationship is defined in the Property entity, where each property has a reference to its owner (user).
}