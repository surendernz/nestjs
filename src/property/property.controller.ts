import { Body, Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';

@Controller('property')
export class PropertyController {
    @Get('all')
    findAll(): string {
        return 'This action returns all properties';
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id,
        @Query('sort', ParseBoolPipe) sort): string {
        console.log('id', id);
        console.log('typeof id', typeof id);
        console.log('sort', sort);
        console.log('typeof sort', typeof sort);
        return `This action returns property with ID: ${id}`;
    }
    @Post('create')
    @UsePipes()
    @HttpCode(202)
    create(@Body() body: CreatePropertyDto): string {
        return 'This action adds a new property with data: ' + JSON.stringify(body);
    }

    @Post('create2')
    // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    @HttpCode(202)
    create2(@Body() body: CreatePropertyDto): string {
        return 'This action adds a new property with data: ' + JSON.stringify(body);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id,
        @Body() body: CreatePropertyDto): string {
        return 'This action updates a property with data: ' + JSON.stringify(body);
    }

}
