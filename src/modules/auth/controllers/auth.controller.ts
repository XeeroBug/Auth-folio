/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SignupDto, LoginDto } from 'src/common/dto/types.dto';
import { DatabaseService } from 'src/modules/db/services/database.service';
import { User } from 'src/common/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('signup')
  async signUp(@Body() data: SignupDto) {
    await this.databaseService.createUser(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.databaseService.validateUser(data.email, data.password);
  }
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number) {
    return await this.databaseService.deleteUser(id);
  }
  @Put("update/:id")
  async updateUser(@Param("id") id:number, @Body() data: User){
    return await this.databaseService.updateUser(id, data)
  }
  @Get("find-user-by-id/:id")
  async findUserById(@Param("id") id: number){
    return await this.databaseService.findUserById(id)
  }
  @Get("get-all-users")
  async getAllUsers(){
    return await this.databaseService.getAllUsers()
  }

}