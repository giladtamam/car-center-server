import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { Ad } from './ad.entity';
import { CarOwnerType } from './ads.models';
import { GetAdsDto } from './dto/get-ads.dto';

@Controller('ads')
export class AdsController {
    constructor(private adsService: AdsService) { }

    @Post()
    createAd(@Body() createAdDto: CreateAdDto): Promise<Ad> {
        return this.adsService.createAd(createAdDto);
    }

    @Get()
    getAds(@Query() getAdsDto: GetAdsDto): Promise<Ad[]> {
        return this.adsService.getAds(getAdsDto);
    }
}
