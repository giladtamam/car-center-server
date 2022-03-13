import { EntityRepository, Repository } from "typeorm";
import { CreateAdDto } from "./dto/create-ad.dto";
import { Ad } from "./ad.entity";
import { GetAdsDto } from "./dto/get-ads.dto";
import { User } from "src/auth/user.entity";
import { InternalServerErrorException, Logger } from "@nestjs/common";
@EntityRepository(Ad)
export class AdRepository extends Repository<Ad> {
    private logger = new Logger('EntityRepository', { timestamp: true });
    async createAd(createAdDto: CreateAdDto, user: User) {
        const {
            areaId: area_id, price, dateOnRoad: date_on_road, hand, engineSize: engine_size, color, testDate: test_date,
            engineType: engine_type, modelId: model_id, subModelId: sub_model_id, year, kilometers, carOwner: car_owner
        } = createAdDto;

        const ad = this.create({
            area_id, price, date_on_road, hand, engine_size, color,
            test_date, engine_type, model_id, sub_model_id,
            year, kilometers, car_owner, user
        });

        await this.save(ad);
        return ad;
    }

    getAds(getAdsDto: GetAdsDto, user?: User): Promise<Ad[]> {
        const { fromYear, toYear, fromHand, toHand } = getAdsDto;
        const query = this.createQueryBuilder('ad');
        if (user) {
            query.where({ user });
        }

        if (getAdsDto.fromYear && getAdsDto.toYear) {
            query.andWhere('"year" BETWEEN :fromYear AND :toYear', { fromYear, toYear });
        }

        if (!getAdsDto.fromYear && getAdsDto.toYear) {
            query.andWhere('"year" <= :toYear', { toYear });
        }

        if (getAdsDto.fromYear && !getAdsDto.toYear) {
            query.andWhere('"year" >= :fromYear', { fromYear });
        }

        if (getAdsDto.fromHand && getAdsDto.toHand) {
            query.andWhere('"hand" BETWEEN :fromHand AND :toHand', { fromHand, toHand });
        }

        if (!getAdsDto.fromHand && getAdsDto.toHand) {
            query.andWhere('"hand" <= :toHand', { toHand });
        }

        if (getAdsDto.fromHand && !getAdsDto.toHand) {
            query.andWhere('"hand" >= :fromHand', { fromHand });
        }
        try {
            const ads = query.getMany();
            return ads;
        } catch (error) {
            this.logger.error(`Failed to get ads for user ${user.email}. Filter ${JSON.stringify(getAdsDto)}`, error.stack)
            throw new InternalServerErrorException();
        }
    }
}