import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarOwnerType, EngineType } from './ads.models';
@Entity()
export class Ad {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'area_id', nullable: true })
    area_id?: number;

    @Column({ name: 'price', nullable: true })
    price?: number;

    @Column({ name: 'date_on_road', nullable: true })
    date_on_road?: Date;

    @Column({ name: 'hand', nullable: true })
    hand?: number;

    @Column({ name: 'engine_type', nullable: true })
    engine_type?: EngineType;

    @Column({ name: 'model_id', nullable: true })
    model_id?: number;

    @Column({ name: 'sub_model_id', nullable: true })
    sub_model_id?: number;

    @Column({ name: 'year', nullable: true })
    year?: number;

    @Column({ name: 'engine_size', nullable: true })
    engine_size?: number;

    @Column({ name: 'kilometers', nullable: true })
    kilometers?: number;

    @Column({ name: 'color', nullable: true })
    color: string;

    @Column({ name: 'test_date', nullable: true })
    test_date?: Date;

    // @Column({ name: 'hand', nullable: true })
    // images_urls?: [];

    @Column({ name: 'car_owner', nullable: true })
    car_owner: CarOwnerType;

    @Column({ name: 'images_urls', nullable: true, type: 'text', array: true })
    images_urls: string[];

    @ManyToOne(_type => User, user => user.ads, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User
}
