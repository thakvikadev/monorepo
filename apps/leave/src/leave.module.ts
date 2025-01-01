import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CoreModule } from '@app/core';
import { UserController } from './application/controller/user.controller';

@Module({
  imports: [CoreModule],
  controllers: [UserController],
  providers: [LeaveService],
})
export class UserModule {}
