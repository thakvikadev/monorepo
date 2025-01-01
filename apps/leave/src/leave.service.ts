import { Injectable } from '@nestjs/common';

@Injectable()
export class LeaveService {
  getHello(): string {
    return 'Hello World!';
  }
}
