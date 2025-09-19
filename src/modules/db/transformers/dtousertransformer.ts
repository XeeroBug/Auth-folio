/* eslint-disable prettier/prettier */
import { SignupDto } from 'src/common/dto/types.dto';
import { User } from 'src/common/entities/user.entity';

//instead of using custom pipes we can use transformer functions
//since it is not on the controller level but on the service level

export function transform(value: SignupDto): User {
    const user = new User();
    user.firstName = value.firstName;
    user.lastName = value.lastName;
    user.email = value.email;
    user.password = value.password;
    return user;
  }
