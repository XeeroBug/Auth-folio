/* eslint-disable prettier/prettier */
<<<<<<< HEAD
// import { Injectable, Logger } from '@nestjs/common';
// import { SignupDto, LoginDto } from 'src/common/dto/types.dto'
// import { User } from 'src/common/entities/user.entity';
// import { DatabaseService } from 'src/modules/db/services/database.service';
=======
import { Injectable, Logger } from '@nestjs/common';
import { SignupDto, LoginDto } from 'src/common/dto/types.dto'

>>>>>>> 7aecc86e0de9a506fa79c4a81382b3bca658b2c8

// @Injectable()
// export class AuthService {
//     private readonly logger = new Logger(AuthService.name)

//     constructor(private readonly dbservice: DatabaseService) {}

//   async register(userDto: SignupDto) {
//     await this.dbservice.createUser(userDto);
//     this.logger.log(`user registered ${JSON.stringify(userDto)}`)
//     return 'User registered';
//   }

<<<<<<< HEAD
//   async login(userDto: LoginDto) {
//     await this.dbservice.validateUser(userDto.email, userDto.password);
//     this.logger.log(`user logged in ${JSON.stringify(userDto)}`)
//     return 'User logged in';
//   }

//   users(): User[]{
//     return this.dbservice.getAllUsers();
//   }
// }
=======
  async login(userDto: LoginDto) {
    this.logger.log(`user logged in ${JSON.stringify(userDto)}`)
    return 'User logged in';
  }
}
>>>>>>> 7aecc86e0de9a506fa79c4a81382b3bca658b2c8
