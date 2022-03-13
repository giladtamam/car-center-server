import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { Manufacturer } from './manufacturer.entity';
import { ManufacturerRepository } from './manufacturer.repository';

@Injectable()
export class ManufacturerService {
    constructor(
        @InjectRepository(ManufacturerRepository)
        private manufacturerRepository: ManufacturerRepository
    ){}

    createManufacturer(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer> {
        return this.manufacturerRepository.createManufacturer(createManufacturerDto)
    }

}
