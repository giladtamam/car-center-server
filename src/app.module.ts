import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsModule } from './ads/ads.module';
import { AuthModule } from './auth/auth.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { CarModelModule } from './car-model/car-model.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'postgres',
                password: 'postgres',
                database: 'car-center',
                autoLoadEntities: true,
                synchronize: true,
                entities: [join(__dirname, '**', '*.entity.{ts,js}')]
            })
        }),
        AdsModule,
        AuthModule,
        ManufacturerModule,
        CarModelModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }

