/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
<<<<<<< HEAD
=======
import { AuthService } from '../services/auth.services';
>>>>>>> 7aecc86e0de9a506fa79c4a81382b3bca658b2c8
import { SignupDto, LoginDto } from 'src/common/dto/types.dto';
import { DatabaseService } from 'src/modules/db/services/database.service';
import { User } from 'src/common/entities/user.entity';

@Controller('auth')
export class AuthController {
<<<<<<< HEAD
  constructor(private readonly databaseService: DatabaseService) {}
=======
  constructor(
    private readonly authService: AuthService,
    private readonly databaseService: DatabaseService,
  ) {}
>>>>>>> 7aecc86e0de9a506fa79c4a81382b3bca658b2c8

  @Post('signup')
  async signUp(@Body() data: SignupDto) {
    await this.databaseService.createUser(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 7aecc86e0de9a506fa79c4a81382b3bca658b2c8
