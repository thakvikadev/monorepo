import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { IUserService } from '../user.service';
import { IUserRepository, USERS_REPOSITORY } from '@leave/domain/adapter/repository/user.repository';
import { UsersCommand } from '@leave/dto/command/users.command';
import { UsersPaging } from '@leave/dto/response/users.response';
import { CreateUserCommand } from '@leave/dto/command/create-user.command';
import { UserResponse } from '@leave/dto/response/user.response';
import { USER_CREATED } from '@leave/application/event/user-created.event';
  
@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: IUserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  getAll({ size, page }: UsersCommand): Promise<UsersPaging> {
    return this.userRepository.getAll({ size, page });
  }

  async create(dto: CreateUserCommand): Promise<UserResponse> {
    const user = await this.userRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
    this.eventEmitter.emit(USER_CREATED, user);
    return user;
  }
}
