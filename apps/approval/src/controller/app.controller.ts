import { APP_SERVICE, IAppService } from '@approval/service/app.service';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(@Inject(APP_SERVICE) private readonly appService: IAppService) {}

  @Get()
  getHello(): Promise<any> {
    return this.appService.getHello();
  }
}
