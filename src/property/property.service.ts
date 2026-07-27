import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Injectable() // marked as injectable so that it can be injected into other classes
export class PropertyService {
    constructor(
        // Injecting the Property repository into the service so that 
        // we can use it to interact with the database
        @InjectRepository(Property) private propertyRepository: Repository<Property>) { }

    async findAll(): Promise<Property[]> {
        return await this.propertyRepository.find(); // find all properties in the database
    }
    async findOne(id: number): Promise<Property | null> {
        const property = await this.propertyRepository.findOneBy({ id });

        // find a property by id in the database
        if (!property) throw new NotFoundException(); // throw an error if the property is not found
        return property; // return the property if found
    }
    async create(createPropertyDto: CreatePropertyDto) {
        console.log('###### createPropertyDto', createPropertyDto);
        const entity = this.propertyRepository.create(createPropertyDto);
        return await this.propertyRepository.save(entity); // save the property to the database
    }
    async update(id: number, updatePropertyDto: UpdatePropertyDto) {
        // this.propertyRepository.save({ ...updatePropertyDto, id }); // update the property in the database  
        return await this.propertyRepository.update({ id }, updatePropertyDto); // update the property in the database
        // return 'This action updates a property with data: ' + JSON.stringify(updatePropertyDto);
    }

    async delete(id: number): Promise<void> {
        await this.propertyRepository.delete(id);
    }

}
