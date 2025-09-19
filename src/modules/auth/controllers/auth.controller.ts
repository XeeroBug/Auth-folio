/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from '../services/auth.services';
import { SignupDto, LoginDto } from 'src/common/dto/types.dto';
import { DatabaseService } from 'src/modules/db/services/database.service';
import { User } from 'src/common/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Post('signup')
  async signUp(@Body() data: SignupDto) {
    await this.databaseService.createUser(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    await this.databaseService.validateUser(data.email, data.password);
  }
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number) {
    await this.databaseService.deleteUser(id);
  }
  @Put("update/:id")
  async updateUser(@Param("id") id:number, @Body() data: User){
    this.databaseService.updateUser(id, data)
  }
  @Get("find-user-by-id/:id")
  async findUserById(@Param("id") id: number){
    return this.databaseService.findUserById(id)
  }
  @Get("get-all-users")
  async getAllUsers(){
    return this.databaseService.getAllUsers()
  }

}
