/* eslint-disable prettier/prettier */
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/common/entities/user.entity';
import { FileService } from './file.service';
import { HashService } from './hash.service';
import { SignupDto } from '../../../common/dto/types.dto';
import { transform } from '../transformers/dtousertransformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DatabaseService {
    private readonly logger = new Logger(DatabaseService.name);
    private users: User[] = [];


    constructor(private readonly fileService: FileService, 
        private readonly hashService: HashService, 
        private readonly jwtService: JwtService) {
        this.users = [];
        fileService.loadUsers().then((loadedUsers) => {
            this.users = loadedUsers;
            this.logger.log(`Loaded ${loadedUsers.length} users from file.`);
        }).catch((err) => {
            this.logger.error('Error loading users:', err);
        });
    }

    async createUser(user: SignupDto): Promise<string> {
        // Logic to create a user in the database
        
        const newUser = transform(user);
        const existingUser = this.users.find(u => u.email == newUser.email);

        if (existingUser) {
            this.logger.warn(`User with email ${newUser.email} already exists.`);
            return 'User already exists';
        }

        newUser.id = this.users.length == 0 ? this.users.length + 1 : this.users[this.users.length -1].id + 1; // Simple auto-increment logic
        const addedUser: User[] = [...this.users]
        newUser.password = await this.hashService.hashPassword(newUser.password)
        addedUser.push(newUser)

        this.fileService.saveUsers(addedUser).then((msg) => {
            this.logger.log(msg);
        }).catch((err) => {
            this.logger.error('Error saving users:', err);
        });

        this.users = [...addedUser]
        this.logger.log(`User created: ${JSON.stringify(newUser)}`);
        return 'User created';
    }

    async findUserById(id: number): Promise<User | null> {
        // Logic to find a user by id in the database
        return Promise.resolve(this.users.find(user => user.id == id) || null);
    }

    async deleteUser(id: number): Promise<void> {
        // Logic to delete a user by id in the database
        const prevLength: number = this.users.length;
        this.users = this.users.filter(user => user.id != id);
        await this.fileService.saveUsers(this.users);
        if (this.users.length == prevLength) {
            throw new Error('User not found');
        }
    }

    async updateUser(id: number, user: Partial<SignupDto>): Promise<User | null> {
        // Logic to update a user by id in the database
        const newUser: Partial<User> = transform(user as SignupDto);

        const existingUser = this.users.find(u => u.id == id);
        if (existingUser) {
            existingUser.firstName = newUser.firstName ?? existingUser.firstName;
            existingUser.lastName = newUser.lastName ?? existingUser.lastName;
            existingUser.email = newUser.email ?? existingUser.email;
            existingUser.password = (newUser.password) ? (await this.hashService.hashPassword(newUser.password) ?? existingUser.password) : existingUser.password;

            Object.assign(existingUser, existingUser);
            const msg = await this.fileService.saveUsers(this.users)
            this.logger.log(`UPDATE: ${msg}`);
            return existingUser;
        }
        return null;
    }   

    async getAllUsers(): Promise<User[]> {
        return Promise.resolve(this.users);
    }

    async validateUser(email: string, password: string): Promise<{ accessToken: string } | null> {
        // Logic to validate user credentials
        const user = this.users.find(user => user.email == email);
        const passwordValid = await this.hashService.comparePasswords(password, user?.password ?? '');
        
        if (!user && !passwordValid) {
            this.logger.warn(`Invalid login credientials`);
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const payload = { email: user?.email, sub: user?.id };
        const token = await this.jwtService.signAsync(payload);
        
        this.logger.log(`User validated: ${JSON.stringify(user)}`);
        return {
            accessToken: token
        };
    }
}