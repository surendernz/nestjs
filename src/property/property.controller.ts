import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('property')
export class PropertyController {
    @Get('all')
    findAll(): string {
        return 'This action returns all properties';
    }
    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns property with ID: ${id}`;
    }
    @Post('create')
    @HttpCode(202)
    create(@Body() body: any): string {
        return 'This action adds a new property with data: ' + JSON.stringify(body);
    }
}
