import * as path from 'path';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { RequestIdInterceptor } from './interceptor/request-id.interceptor';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserController } from './controller/user.controller';
import { HomeListener } from './listener/home.listener';
import { RolesGuard } from './guard/roles.guard';
import { PermissionGuard } from './guard/permissions.guard';
import { UserListener } from './listener/user.listener';
import { HttpExceptionFilter } from './exception/filter/http.filter';
import {
  AcceptLanguageResolver,
  I18nModule,
} from 'nestjs-i18n';
import { BadRequestExceptionFilter } from './exception/filter/bad-request.filter';
import { DomainModule } from '@leave/domain/domain.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60*1000,
      limit: 60*1000,
    }]),
    I18nModule.forRoot({
      fallbackLanguage: process.env.FALLBACK_LOCALE || 'en',
      loaderOptions: {
        path: path.join(__dirname, '../i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    EventEmitterModule.forRoot(),
    DomainModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestIdInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
    HomeListener,
    UserListener,
  ],
})
export class ApplicationModule {}
