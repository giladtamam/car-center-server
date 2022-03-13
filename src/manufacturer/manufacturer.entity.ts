import { CarModel } from "src/car-model/car-model.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manufacturer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true, unique: true })
    value: string;

    @Column({ nullable: true })
    name: string;

    @OneToMany(_type => CarModel, carModel => carModel.manufacturer, { eager: false })
    models: CarModel[];
}