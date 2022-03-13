import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdRepository } from 'src/ads/ad.repository';
import { CarModelRepository } from './car-model.repository';
import { CarModelController } from './car-model.controller';
import { CarModelService } from './car-model.service';
import { ManufacturerRepository } from 'src/manufacturer/manufacturer.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([CarModelRepository, ManufacturerRepository]),
      ],
    controllers: [CarModelController],
    providers: [CarModelService],
    // controllers: [],
    // providers: []
})
export class CarModelModule { }
