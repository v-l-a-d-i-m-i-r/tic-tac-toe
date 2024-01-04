import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';
import { USERS_COLLECTION_NAME, UserEntity, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
        collection: USERS_COLLECTION_NAME,
      },
    ]),
  ],
  providers: [UserService, UserRepository, UserMapper],
  exports: [UserService],
})
export class UserModule {}
