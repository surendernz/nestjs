import { Body, Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdpipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import type { CreatePropertyZodDto } from './dto/createPropertyZod.dto';
import { createPropertyZodSchema } from './dto/createPropertyZod.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-headers';
import { PropertyService } from './property.service';

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
    findAll(): string {
        return this.propertyService.findAll();
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id,
        @Query('sort', ParseBoolPipe) sort): string {
        console.log('id', id);
        console.log('typeof id', typeof id);
        console.log('sort', sort);
        console.log('typeof sort', typeof sort);
        return this.propertyService.findOne(id);
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
    create(@Body() body: CreatePropertyDto): string {
        return this.propertyService.create(body);
    }

    @Post('create2')
    // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    @HttpCode(202)
    create2(@Body() body: CreatePropertyDto): string {
        return this.propertyService.create(body);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id,
        @Body() body: CreatePropertyDto): string {
        return this.propertyService.update(id, body);
    }
    //customer transform pipe
    @Patch('custom/:id')
    update2(@Param('id', ParseIdPipe) id,
        @Body() body: CreatePropertyDto): string {
        return 'This action updates a property with data: ' + JSON.stringify(body);
    }

    //ZOD validation
    @Patch('zod/:id')
    update3(@Param('id') id,
        @Body(new ZodValidationPipe(createPropertyZodSchema)) body: CreatePropertyZodDto): string {
        return 'This action updates a property with data: ' + JSON.stringify(body);
    }

    // headers validation
    @Patch('headers/:id')
    update4(@Param('id', ParseIntPipe) id,
        @Body() body: CreatePropertyDto,
        @RequestHeader(new ValidationPipe({ validateCustomDecorators: true }))
        header: HeadersDto) {
        return header;

    }
}
