import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './application/controller/user.controller';
import { UserService } from './domain/service/impl/user.service';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should defined"', () => {
      expect(userController.index({page:1,size:20})).toBeDefined();
    });
  });
});
