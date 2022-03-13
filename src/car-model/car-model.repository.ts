
import { Manufacturer } from "src/manufacturer/manufacturer.entity";
import { EntityRepository, Repository } from "typeorm";
import { CarModel } from "./car-model.entity";
import axios from 'axios';

@EntityRepository(CarModel)
export class CarModelRepository extends Repository<CarModel> {
  getCarModel(id: string) {
    return this.findOne(id);
  }

  async getAllManufacturerModel(manufacturer: Manufacturer): Promise<CarModel[]> {
    return this.find({ manufacturer });
  }
  // async createCarModel(createCarModelDto: CreateCarModelDto, manufacturer: Manufacturer): Promise<CarModel> {
  //     const { name } = createCarModelDto;

  //     const task = this.create({
  //       name,
  //       manufacturer,
  //     });

  //     await this.save(task);
  //     return task;
  //   }
  async createCarModel(manufacturers: Manufacturer[]) {
    console.log(manufacturers[1].name);
    manufacturers.forEach(async mf => {
      const { data } = await axios.get(`https://personal.yad2.co.il/api/auto-complete?manufacturer=${mf.value}&cat=1&subcat=1&step=1&action=getModel`);
      data.data.forEach(async car => {
        const ca = this.create({
          value: car.value,
          name: car.text,
          manufacturer: mf
        })

        await this.save(ca);
      })
    });
  }
}

// EntityRepository(Ad)
// export class CarModelRepository extends Repository<Ad> {
    // async createModel({ id, model }: { id: number, model: string }): Promise<void> {
    //     console.log('######', id, model)
    //     //const b = this.create({ id, model });
    //     // await this.save(b);
    //     // const b: CarModel = { id: 1, mode
    //     // return b;
    // }
// }