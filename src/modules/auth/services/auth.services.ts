/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { SignupDto, LoginDto } from 'src/common/dto/types.dto'

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
  register(userDto: SignupDto) {
    this.logger.log(`user registered ${JSON.stringify(userDto)}`)
    return 'User registered';
  }

  login(userDto: LoginDto) {
    this.logger.log(`user logged in ${JSON.stringify(userDto)}`)
    return 'User logged in';
  }
}
