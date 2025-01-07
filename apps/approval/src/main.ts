import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { bold } from 'kleur';
import { ApprvalModule } from './approval.module';

async function bootstrap() {
  const logger = new Logger('HTTP');
  const app = await NestFactory.create(ApprvalModule);

  // Enable URI versioning with a default version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.API_VERSION || '1',
  });

  const port = parseInt(process.env.PORT, 10) || 8682;
  logger.log(`🟢 Project "${process.env.PROJECT}" is listening on port ${bold(port.toString())} 🟢`);

  await app.listen(port);
}
bootstrap();
