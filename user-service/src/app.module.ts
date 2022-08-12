import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_PORT),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// 'mongodb://127.0.0.1:27017/users'
/* const mongoose = require('mongoose');
const { logger } = require('../gcp/logger');

const CONNECTION_URL = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD
  + '@cluster0-yr0be.mongodb.net/' + process.env.DB_NAME + '?retryWrites=true&w=majority';

mongoose.connection.on('open', () => {
  logger.info('Connected to mongo server!');
});

module.exports = async (logger) => {
  try {
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}; */
