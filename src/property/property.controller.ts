import { Body, Controller, Delete, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdpipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import type { CreatePropertyZodDto } from './dto/createPropertyZod.dto';
import { createPropertyZodSchema } from './dto/createPropertyZod.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-headers';
import { PropertyService } from './property.service';
import { Property } from 'src/entities/property.entity';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Controller('property')
export class PropertyController {
    // this is dependency injection, we are injecting the PropertyService into the
    // controller. The controller is responsible for handling the incoming requests and 
    // returning the responses to the client. The service is responsible for handling
    //  the business logic and interacting with the database. The controller calls the 
    // service methods to perform the required operations.
    // constructor(private readonly propertyService: PropertyService) { }
    //or
    propertyService: PropertyService;
    constructor(propertyService: PropertyService) {
        this.propertyService = propertyService;
    }
    // Don't do the below, instead use dependency injection, as shown above. 
    // This is because the controller is a singleton and the service is a singleton. 
    // If we create a new instance of the service in the controller, 
    // we will have two instances of the service and they will not share the same state. 
    // This can lead to unexpected behavior and bugs.
    // constructor(){
    //     this.propertyService = new PropertyService();
    // }
    @Get('all')
    async findAll(): Promise<Property[]> {
        return await this.propertyService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id): Promise<Property | null> {
        console.log('id', id);
        console.log('typeof id', typeof id);
        return await this.propertyService.findOne(id);
    }
    @Get('test/:id')
    findOne2(@Param() id: IdParamDto,
        @Query('sort', ParseBoolPipe) sort): string {
        console.log('id', id);
        console.log('typeof id', typeof id);
        console.log('sort', sort);
        console.log('typeof sort', typeof sort);
        return `This action returns property with ID: ${id.id}`;
    }
    @Post('create')
    @UsePipes()
    @HttpCode(202)
    async create(@Body() dto: CreatePropertyDto): Promise<{ message: string, data: Property }> {
        console.log('###### createPropertyDto', dto);
        const saved = await this.propertyService.create(dto);
        return { message: 'created', data: saved };
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id,
        @Body() body: UpdatePropertyDto): Promise<any> {
        const updated = await this.propertyService.update(id, body);
        // return { message: 'updated', data: updated };
        return updated;
    }
    //customer transform pipe
    @Patch('custom/:id')
    update2(@Param('id', ParseIdPipe) id,
        @Body() body: UpdatePropertyDto): string {
        return 'This action updates a property with data: ' + JSON.stringify(body);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id): Promise<any> {
        return await this.propertyService.delete(id);
    }
}
