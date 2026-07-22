import { Injectable } from '@nestjs/common';

@Injectable() // marked as injectable so that it can be injected into other classes
export class PropertyService {
    findAll(): string {
        return 'This action returns all properties';
    }
    findOne(id: number): string {
        return `This action returns property with ID: ${id}`;
    }
    create(createPropertyDto: any): string {
        return 'This action adds a new property with data: ' + JSON.stringify(createPropertyDto);
    }
    update(id: number, updatePropertyDto: any): string {
        return 'This action updates a property with data: ' + JSON.stringify(updatePropertyDto);
    }

}
