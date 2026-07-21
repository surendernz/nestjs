import { Body, Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Post, Query } from '@nestjs/common';

@Controller('property')
export class PropertyController {
    @Get('all')
    findAll(): string {
        return 'This action returns all properties';
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort): string {
        console.log('id', id);
        console.log('typeof id', typeof id);
        console.log('sort', sort);
        console.log('typeof sort', typeof sort);
        return `This action returns property with ID: ${id}`;
    }
    @Post('create')
    @HttpCode(202)
    create(@Body() body: any): string {
        return 'This action adds a new property with data: ' + JSON.stringify(body);
    }
}
