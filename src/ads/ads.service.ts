import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdDto } from './dto/create-ad.dto';
import { Ad } from './ad.entity';
import { AdRepository } from './ad.repository';
import { GetAdsDto } from './dto/get-ads.dto';

@Injectable()
export class AdsService {
    constructor(
        @InjectRepository(AdRepository)
        private adsRepository: AdRepository
    ){}
    
    createAd(createAdDto: CreateAdDto): Promise<Ad> {
        return this.adsRepository.createAd(createAdDto);
    }

    async getAds(getAdsDto: GetAdsDto): Promise<Ad[]> {
        return this.adsRepository.getAds(getAdsDto);
    }
}

