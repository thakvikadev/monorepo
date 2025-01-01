import { CreateUserCommand } from "@leave/dto/command/create-user.command";
import { UsersQuery } from "@leave/dto/query/users.query";
import { UserResponse } from "@leave/dto/response/user.response";
import { UsersPaging } from "@leave/dto/response/users.response";

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface IUserRepository {
  getAll(query: UsersQuery): Promise<UsersPaging>;
  create(dto: CreateUserCommand): Promise<UserResponse>;
}
