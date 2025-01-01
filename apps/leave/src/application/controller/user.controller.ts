import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { CreateUserRequest } from '../request/create-user.request';
import { PaginateRequest } from '../request/paging.query';
import { IUserService, USER_SERVICE } from '@leave/domain/service/user.service';
import { UsersPaging } from '@leave/dto/response/users.response';
import { UserCreatedResponse } from '@leave/dto/response/user-created.response';

@Controller('/users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Get()
  async index(@Query() query: PaginateRequest): Promise<UsersPaging> {
    return this.userService.getAll(query);
  }

  @Post()
  async create(
    @Body() request: CreateUserRequest,
  ): Promise<UserCreatedResponse> {
    return {
      user: await this.userService.create({
        firstName: request.firstName,
        lastName: request.lastName,
      }),
    };
  }
}
