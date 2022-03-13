import { IsNotEmpty, IsEnum } from 'class-validator';
import { CarOwnerType, EngineType } from '../ads.models';
export class CreateAdDto {
    title?: string;
    areaId?: number;
    price?: number;
    dateOnRoad?: Date;
    hand?: number;
    engineSize?: number;
    color?: string;
    testDate?: Date;

    @IsEnum(EngineType)
    engineType?: EngineType;
    modelId?: number;
    subModelId?: number;
    year?: number;
    kilometers?: number;

    @IsEnum(CarOwnerType)
    carOwner?: CarOwnerType;
}
