import { Injectable } from '@nestjs/common';
import { IAppService } from '..';
import { AppRepository } from '../../io/repository/app.repository';

@Injectable()
export class AppService implements IAppService {
    constructor(private readonly appRepo: AppRepository) {}
    getHello(): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
