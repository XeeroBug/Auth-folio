/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.services';
import { SignupDto, LoginDto } from 'src/common/dto/types.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('signup')
    signUp(@Body() data: SignupDto) {
        this.authService.register(data);
    }

    @Post('login')
    login(@Body() data: LoginDto) {
        this.authService.login(data);
    }

    @Get()
    test(){
        return 'working very nice';
    }
}