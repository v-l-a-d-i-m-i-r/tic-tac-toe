import { Injectable } from '@nestjs/common';

import { PrivateUserModel, UserModel } from './user.model';
import { UserEntity } from './user.schema';

@Injectable()
export class UserMapper {
  public mapEntityToModel(entity: UserEntity): UserModel {
    return {
      id: entity._id.toHexString(),
      // name: entity.name,
      email: entity.email,
    };
  }

  public mapEntityToPrivateModelIfExists(entity: UserEntity | null): PrivateUserModel | null {
    if (!entity) {
      return null;
    }

    return {
      id: entity._id.toHexString(),
      email: entity.email,
      passwordHash: entity.passwordHash,
    };
  }
}
