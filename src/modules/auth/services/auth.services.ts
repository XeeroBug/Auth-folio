import { Injectable, Logger } from '@nestjs/common';
import { signupDto, loginDto } from '../dtos/types.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
  register(userDto: signupDto) {
    this.logger.log(`user registered ${userDto}`)
    return 'User registered';
  }

  login(userDto: loginDto) {
    this.logger.log(`user logged in ${userDto}`)
    return 'User logged in';
  }
}
