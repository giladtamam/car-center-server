import { Body, Controller, Get, Logger, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { Ad } from './ad.entity';
import { CarOwnerType, SearchOptions } from './ads.models';
import { GetAdsDto } from './dto/get-ads.dto';
import axios from 'axios';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
@Controller('ads')
@UseGuards(AuthGuard())
export class AdsController {

    private logger = new Logger('AdsController', { timestamp: true });

    constructor(private adsService: AdsService) { }

    @Post()
    createAd(
        @Body() createAdDto: CreateAdDto,
        @GetUser() user: User): Promise<Ad> {
        this.logger.verbose(`User "${user.email}" creating a new task. Data: ${JSON.stringify(createAdDto)}`);
        return this.adsService.createAd(createAdDto, user);
    }

    @Get()
    async getAds(@Query() getAdsDto: GetAdsDto, @GetUser() user: User): Promise<Ad[]> {
        this.logger.verbose(`User "${user.email}" retrieving all ads`);
        return this.adsService.getAds(getAdsDto, user);
    }

    @Get('/test')
    async test(@Req() req): Promise<void> {
        const { data: { data: { manufacturer } } } = await axios.get('https://gw.yad2.co.il/search-options/vehicles/cars?fields=manufacturer');
        //console.log(data)
        // const element = manufacturer[0];
        // await this.adsService.createBrand(element.text);
        // console.log(manufacturer);
        //console.log(req)
    }

    @Get('/search-options')
    async searchOptions(@GetUser() user: User): Promise<SearchOptions> {
        return await this.adsService.getSearchOptions();
    }
}
