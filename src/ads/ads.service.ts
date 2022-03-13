import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdDto } from './dto/create-ad.dto';
import { Ad } from './ad.entity';
import { AdRepository } from './ad.repository';
import { GetAdsDto } from './dto/get-ads.dto';
import { User } from 'src/auth/user.entity';
import { SearchOptions } from './ads.models';
import { ManufacturerRepository } from 'src/manufacturer/manufacturer.repository';
// import { SearchOptions } from './ads.models';
// import { ManufacturerRepository } from 'src/manufacturer/manufacturer.repository';

@Injectable()
export class AdsService {
    constructor(
        @InjectRepository(AdRepository)
        private adsRepository: AdRepository,
        @InjectRepository(ManufacturerRepository)
        private manufacturerRepository: ManufacturerRepository
    ){}
    
    createAd(createAdDto: CreateAdDto, user: User): Promise<Ad> {
        return this.adsRepository.createAd(createAdDto, user);
    }

    async getAds(getAdsDto: GetAdsDto, user?: User): Promise<Ad[]> {
        return this.adsRepository.getAds(getAdsDto, user);
    }

    async getSearchOptions(): Promise<SearchOptions> {
        const manufacturers = await this.manufacturerRepository.getManufacturers();
        const searchOptions: SearchOptions = { manufacturers };

        return searchOptions;
    }
}

