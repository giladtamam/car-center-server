import { Controller, Get, Query, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './create-cat.dto';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
    @Post()
    create(@Res() res: Response) {
        res.status(HttpStatus.CREATED).send([]);
    }

    @Get()
    findAll(@Res({ passthrough: true }) res: Response) {
        res.status(HttpStatus.OK);
        return 'asdadsadasd';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} cat`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}
