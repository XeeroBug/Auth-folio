/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants';

@Module({
  imports: [DatabaseModule, JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    })],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
