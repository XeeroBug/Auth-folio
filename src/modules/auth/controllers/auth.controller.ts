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
    async signUp(@Body() data: SignupDto) {
        await this.authService.register(data);
    }

    @Post('login')
    async login(@Body() data: LoginDto) {
        await this.authService.login(data);
    }

    @Get()
    test(){
        return this.authService.users();
    }
}