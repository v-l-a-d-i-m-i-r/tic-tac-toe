import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export const USERS_COLLECTION_NAME = 'users';

@Schema({ collection: USERS_COLLECTION_NAME, timestamps: true })
export class UserEntity {
  public _id: Types.ObjectId;
  public createdAt: Date;
  public updatedAt: Date;

  @Prop({ type: String })
  public email: string;

  @Prop({ type: String })
  public passwordHash: string;
}

export type UserDocument = HydratedDocument<UserEntity>;
export const UserSchema = SchemaFactory.createForClass(UserEntity);
