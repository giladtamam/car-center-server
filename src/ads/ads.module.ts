import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdRepository } from './ad.repository';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdRepository])
  ],
  controllers: [AdsController],
  providers: [AdsService]
})
export class AdsModule {}
