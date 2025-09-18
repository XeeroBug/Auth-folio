import { Body, Controller, Get, Post, } from "@nestjs/common";
import { AuthService } from "../services/auth.services";
import { loginDto, signupDto } from "../dtos/types.dto";
import { json } from "stream/consumers";

@Controller("auth")
export class AuthController{
    constructor(
        private readonly authService: AuthService
    ){}

    @Post("signup")
    signUp(@Body() data:signupDto){
        this.authService.register(data)
    }

    @Post("login")
    login(@Body() data:loginDto){
        this.authService.login(data)
    }

    @Get()
    test(){
        return 'working';
    }
}