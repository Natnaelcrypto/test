import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports:[MulterModule.register({
    dest:"./uploads"
  })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
