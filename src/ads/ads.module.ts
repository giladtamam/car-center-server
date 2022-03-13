import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ManufacturerRepository } from 'src/manufacturer/manufacturer.repository';
import { AdRepository } from './ad.repository';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdRepository, ManufacturerRepository]),
    AuthModule
  ],
  controllers: [AdsController],
  providers: [AdsService]
})
export class AdsModule {}
