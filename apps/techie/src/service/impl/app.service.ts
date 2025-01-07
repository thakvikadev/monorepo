import { Injectable } from '@nestjs/common';
import { AppRepository } from '../../io/repository/app.repository';
import { IAppService } from '../app.service';

@Injectable()
export class AppService implements IAppService {
  constructor(private readonly appRepo: AppRepository) {}
  getHello(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
