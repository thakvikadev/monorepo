import { CreateUserCommand } from "@leave/dto/command/create-user.command";
import { UsersCommand } from "@leave/dto/command/users.command";
import { UserResponse } from "@leave/dto/response/user.response";
import { UsersPaging } from "@leave/dto/response/users.response";

 

export const USER_SERVICE = 'USER_SERVICE';

export interface IUserService {
  getAll(dto: UsersCommand): Promise<UsersPaging>;
  create(dto: CreateUserCommand): Promise<UserResponse>;
}
