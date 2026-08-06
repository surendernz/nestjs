import { Column, Entity, ForeignKey, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Property } from "./property.entity";
@Entity()
export class PropertyFeature {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number
    @Column()
    bedRooms!: number;
    @Column()
    bathRooms!: number;
    @Column()
    parkingSpots!: number;
    @Column()
    area!: number;
    @Column()
    hasBalcony!: boolean;
    @Column()
    hasSwimmingPool!: boolean;
    @Column()
    hasGardenYard!: boolean;
    @OneToOne(() => Property, (property) => property.propertyFeature)
    @JoinColumn() // this creates the foreign key column in the PropertyFeature table
    property!: Property;
}