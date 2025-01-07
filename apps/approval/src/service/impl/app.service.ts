import { AppRepository } from '../../io/repository/app.repository';
import { Injectable } from '@nestjs/common';
import { IAppService } from '..';

@Injectable()
export class AppService implements IAppService {
  constructor(private readonly appRepository: AppRepository) {}
  getHello(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
