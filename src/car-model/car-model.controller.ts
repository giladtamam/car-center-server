import { Controller, Get, Logger, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CarModel } from './car-model.entity';
import { CarModelService } from './car-model.service';
import axios from 'axios';
import { CarImage } from './car-image.entity';
import { GetCarModelImagesDto } from './dto/get-car-model-images.dto';

interface ImagesResponse {
    query: any;
    images: CarImage[]
}
@Controller('car-model')
export class CarModelController {
    private logger = new Logger('CarModelController');
    constructor(private carModelService: CarModelService) { }

    @Get('images')
    async getCarModelImages(@Query() getCarModelImagesDto: GetCarModelImagesDto): Promise<CarImage[]> {
        try {
            const { data } = await axios.request<ImagesResponse>({
                url: 'https://api.carsxe.com/images',
                method: 'get',
                params: {
                    key: '58w72shlx_ox5slp7es_4ev6aqu0l',
                    ...getCarModelImagesDto
                },
            });
            return data.images;
        } catch (error) {
            this.logger.error('Get images failed', error.stack);
        }
    }

    @Get(':id')
    public getCarModel(@Param('id') id: string): Promise<CarModel> {
        return this.carModelService.getCarModel(id);
    }

    @Get('/manufacturer/:id')
    getAllManufacturerModel(@Param('id') id: string): Promise<CarModel[]> {
        return this.carModelService.getAllManufacturerModel(id);
    }
}
