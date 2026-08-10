import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyFeature } from "./propertyFeature.entity";
import { User } from "./user.entity";

// database details: https://console.neon.tech/app/projects/morning-mountain-99180662/branches/br-sparkling-heart-awmvjyyq/tables?database=neondb

@Entity()
export class Property {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;
    @Column()
    name!: string;
    @Column()
    description!: string;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price!: number;
    @Column()
    location!: string;
    // info: OnetoOne parameters are (target entity, inverse side property, options)
    // cascade: true means that when a Property is saved, its related PropertyFeature will 
    // also be saved automatically.
    // inverse side property is the property in PropertyFeature that points back to Property, 
    // which is 'property' in this case. Allows for bidirectional relationship management.
    @OneToOne(() => PropertyFeature, (propertyFeature) => propertyFeature.property, { cascade: true })
    @JoinColumn({ name: 'propertyFeatureId' }) // this creates the foreign key column in the Property table
    propertyFeature!: PropertyFeature

    @ManyToOne(() => User, (user) => user.properties)
    @JoinColumn({ name: 'ownerId' }) // this creates the foreign key column in the Property table
    //  and gives it a custom name 'ownerId' instead of the default 'userId'.
    user!: User;
}