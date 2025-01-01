import { Controller, Get, Inject } from '@nestjs/common';
import { APP_SERVICE, IAppService } from '../service/app.service';

@Controller()
export class AppController {
    constructor(@Inject(APP_SERVICE) private readonly appService: IAppService) {}

    @Get()
    getHello(): Promise<any> {
        return this.appService.getHello();
    }
}
