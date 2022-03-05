import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AdsModule } from './ads/ads.module';

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'postgres',
            database: 'car-center',
            autoLoadEntities: true,
            synchronize: true
        }),
        AdsModule
    ],
})
export class AppModule { }

