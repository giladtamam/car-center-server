import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManufacturerRepository } from 'src/manufacturer/manufacturer.repository';
import { CarModel } from './car-model.entity';
import { CarModelRepository } from './car-model.repository';

@Injectable()
export class CarModelService {
    constructor(
        @InjectRepository(CarModelRepository)
        private carModelsRepository: CarModelRepository,
        @InjectRepository(ManufacturerRepository)
        private manufacturerRepository: ManufacturerRepository,
    ) {}
    async createCarModel() {
        const manufacturers = await this.manufacturerRepository.getManufacturers();
        this.carModelsRepository.createCarModel(manufacturers);
    }

    getCarModel(id: string) {
        return this.carModelsRepository.getCarModel(id);
    }

    async getAllManufacturerModel(manufacturerId: string): Promise<CarModel[]> {
        const manufacturer = await this.manufacturerRepository.findOne(manufacturerId);
        return this.carModelsRepository.getAllManufacturerModel(manufacturer);
    }
}
