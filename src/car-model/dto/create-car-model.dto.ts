import { IsString } from "class-validator";

export class CreateCarModelDto {
    @IsString()
    name: string;
}