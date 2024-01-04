import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserMapper } from './user.mapper';
import { PrivateUserModel, UserModel } from './user.model';
import { UserDocument, UserEntity } from './user.schema';

@Injectable()
export class UserRepository {
  public constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private readonly userMapper: UserMapper,
  ) {}

  public async createUser(input: CreateUserInput): Promise<UserModel> {
    const user = await this.userModel.create(input);

    return this.userMapper.mapEntityToModel(user);
  }

  public async checkUserExists(input: CheckUserExistsInput): Promise<boolean> {
    const user = await this.userModel.exists(input);

    return Boolean(user);
  }

  public async findUserByEmail(input: FindUserByEmailInput): Promise<PrivateUserModel | null> {
    const filter = {
      email: input.email,
    };

    const projection = {
      _id: 1,
      email: 1,
      passwordHash: 1,
    };

    const user = await this.userModel.findOne(filter, projection);

    return this.userMapper.mapEntityToPrivateModelIfExists(user);
  }
}

type FindUserByEmailInput = {
  email: string;
};

type CheckUserExistsInput = {
  email: string;
};

type CreateUserInput = {
  email: string;
  passwordHash: string;
};
