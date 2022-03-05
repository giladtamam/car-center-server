import { EntityRepository, Repository } from "typeorm";
import { CreateAdDto } from "./dto/create-ad.dto";
import { Ad } from "./ad.entity";
import { GetAdsDto } from "./dto/get-ads.dto";

@EntityRepository(Ad)
export class AdRepository extends Repository<Ad> {

    async createAd(createAdDto: CreateAdDto) {
        const { 
            areaId: area_id, price, dateOnRoad: date_on_road, hand, engineSize: engine_size, color, testDate: test_date,
            engineType: engine_type, modelId: model_id, subModelId: sub_model_id, year, kilometers, carOwner: car_owner
        } = createAdDto;

        const ad = this.create({
            area_id, price, date_on_road, hand, engine_size, color,
            test_date, engine_type, model_id, sub_model_id,
            year, kilometers, car_owner
        });

        await this.save(ad);
        return ad;  
    }

    async getAds(getAdsDto: GetAdsDto): Promise<Ad[]> {
        const { fromYear, toYear } = getAdsDto;
        const query = this.createQueryBuilder('ad');

        if (getAdsDto.fromYear && getAdsDto.toYear) {
            query.andWhere('"year" BETWEEN :fromYear AND :toYear', { fromYear, toYear });
        }

        if (!getAdsDto.fromYear && getAdsDto.toYear) {
            query.andWhere('"year" <= :toYear', { toYear });
        }

        if (getAdsDto.fromYear && !getAdsDto.toYear) {
            query.andWhere('"year" >= :fromYear', { fromYear });
        }
        
        return await query.getMany();
    }
}