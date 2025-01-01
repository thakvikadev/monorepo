import { IUserRepository } from '@leave/domain/adapter/repository/user.repository';
import { CreateUserCommand } from '@leave/dto/command/create-user.command';
import { UsersCommand } from '@leave/dto/command/users.command';
import { UserResponse } from '@leave/dto/response/user.response';
import { UsersPaging } from '@leave/dto/response/users.response';
import { User } from '@leave/leave.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll({ size = 10, page = 1 }: UsersCommand): Promise<UsersPaging> {
    const [users, total] = await this.usersRepository
      .findAndCount({
        order: {
          id: 'DESC',
        },
        skip: size * (page - 1),
        take: size * 1,
      })
      .then(([users, total]) => [
        users.map((user) => ({
          uuid: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          isActive: user.isActive 
        })),
        total,
      ]);

    return {
      users: {
        users,
        page: page * 1,
        size: size * 1,
        total,
      },
    };
  }

  create(dto: CreateUserCommand): Promise<UserResponse> {
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;

    return this.usersRepository.save(user).then((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    }));
  }
}
