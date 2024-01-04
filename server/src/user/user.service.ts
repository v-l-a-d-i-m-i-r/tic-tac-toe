import { BadRequestException, Injectable } from '@nestjs/common';

import { PrivateUserModel, UserModel } from './user.model';
import { UserRepository } from './user.repository';
import { Errors } from '../const/errors';

@Injectable()
export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async createUser(input: CreateUserInput): Promise<UserModel> {
    const { email } = input;

    // TODO: can be covered with unique index. Migration mechanism is out of the scope of the task.
    const isUserExist = await this.userRepository.checkUserExists({ email });

    if (isUserExist) {
      throw new BadRequestException(Errors.userAlreadyExists);
    }

    return this.userRepository.createUser(input);
  }

  public findUserByEmail(input: FindUserByEmailInput): Promise<PrivateUserModel | null> {
    return this.userRepository.findUserByEmail(input);
  }
}

type FindUserByEmailInput = {
  email: string;
};

type CreateUserInput = {
  email: string;
  passwordHash: string;
};
