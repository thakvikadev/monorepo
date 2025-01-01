import { InfrastructureModule } from '@leave/infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { USER_SERVICE } from './service/user.service';
import { UserService } from './service/impl/user.service';
 

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
})
export class DomainModule {}
