import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';
import { WSModule } from './ws/ws.module';
import { JWT_SECRET, MONGO_URL } from './config/config';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      // TODO: Implemented without expiration time for test purposes
      // signOptions: { expiresIn: '60s' },
    }),
    LoggerModule,
    WSModule,
    AuthModule,
    UserModule,
    GameModule,
  ],
})
export class AppModule {}
