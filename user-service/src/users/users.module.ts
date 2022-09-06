import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as redis from 'cache-manager-ioredis';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../schemas/user.schema';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CacheModule.register({
      memory: redis,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'IUsersService',
      useClass: UsersService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [
    {
      provide: 'IUsersService',
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
