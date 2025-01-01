import { Module } from '@nestjs/common';
import { IOModule } from './io/io.module';

@Module({
  imports: [IOModule],
  exports: [IOModule],
})
export class InfrastructureModule {}
