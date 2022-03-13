import { CarModel } from "src/car-model/car-model.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateManufacturerDto } from "./dto/create-manufacturer.dto";
import { Manufacturer } from "./manufacturer.entity";

@EntityRepository(Manufacturer)
export class ManufacturerRepository extends Repository<Manufacturer> {
    async createManufacturer(createManufacturerDto: CreateManufacturerDto) {
        const b = this.create(createManufacturerDto);
        await this.save(b);
        return b;
    }

    async getManufacturers(): Promise<Manufacturer[]> {
        return this.find();
    }
}