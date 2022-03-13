import { Controller, Get, Post } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { Manufacturer } from './manufacturer.entity';
import { ManufacturerRepository } from './manufacturer.repository';
import { ManufacturerService } from './manufacturer.service';
import axios from 'axios';

@Controller('manufacturer')
export class ManufacturerController {
    constructor(private manufacturerService: ManufacturerService) { }

    @Get()
    async createManufacturers(): Promise<void> {
        let manufacturer;
        {
            const { data } = await axios.get('https://gw.yad2.co.il/search-options/vehicles/cars?fields=manufacturer');
            manufacturer = data.data.manufacturer[0];
            data.data.manufacturer.forEach(async (mf) => {
                console.log(mf)
                const createManufacturerDto: CreateManufacturerDto = { name: mf.text, value: mf.value}
                await this.manufacturerService.createManufacturer(createManufacturerDto);
            });   
        }
        {
            // const { data } = await axios.get(`https://personal.yad2.co.il/api/auto-complete?manufacturer=${manufacturer}&cat=1&subcat=1&step=1&action=getModel`);
            // console.log(data);
        }
    }

    @Post()
    createManufacturer(createManufactorerDto: CreateManufacturerDto): Promise<Manufacturer> {
        return this.manufacturerService.createManufacturer(createManufactorerDto);
    }

}
