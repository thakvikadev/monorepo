import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig, { Entities } from './_config/database.config';
import { AppController } from './controller';
import { AppRepository } from './io/repository/app.repository';
import { APP_SERVICE } from './service';
import { AppService } from './service/impl';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig(__dirname + '/**/*.entity{.ts,.js}')],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(Entities),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_SERVICE,
      useClass: AppService,
    },
    AppRepository,
  ],
})
export class AppModule {}
