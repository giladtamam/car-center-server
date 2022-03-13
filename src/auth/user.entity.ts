import { Ad } from "src/ads/ad.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    password?: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    display_name: string;

    @OneToMany(_type => Ad, ad => ad.user, { eager: true })
    ads: Ad[];
}