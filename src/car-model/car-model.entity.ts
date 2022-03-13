import { Exclude } from "class-transformer";
import { Manufacturer } from "src/manufacturer/manufacturer.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CarModel {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ unique:true, nullable: true })
    value: string;

    @ManyToOne(_type => Manufacturer, manufacturer => manufacturer.models, { eager: true })
    // @Exclude({ toPlainOnly: true })
    manufacturer: Manufacturer
}