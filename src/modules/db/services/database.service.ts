/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { FileService } from './file.service';
import { HashService } from './hash.service';
import { SignupDto } from '../../../common/dto/types.dto';
import { transform } from '../transformers/dtousertransformer';

@Injectable()
export class DatabaseService {
    private readonly logger = new Logger(DatabaseService.name);
    private users: User[] = [];


    constructor(private readonly fileService: FileService, 
        private readonly hashService: HashService) {
        this.users = [];
        fileService.loadUsers().then((loadedUsers) => {
            this.users = loadedUsers;
            this.logger.log(`Loaded ${loadedUsers.length} users from file.`);
        }).catch((err) => {
            this.logger.error('Error loading users:', err);
        });
    }

    createUser(user: SignupDto): void {
        // Logic to create a user in the database
        
        const newUser = transform(user);
        newUser.id = this.users.length + 1; // Simple auto-increment logic
        const addedUser: User[] = [...this.users]

        if(newUser.password){
            this.hashService.hashPassword(newUser.password).then((hashedPassword) => {
                newUser.password = hashedPassword;
            }).catch((err) => {
                this.logger.error('Error hashing password:', err);
            });
        }

        addedUser.push(newUser)

        this.fileService.saveUsers(addedUser).then((msg) => {
            this.logger.log(msg);
        }).catch((err) => {
            this.logger.error('Error saving users:', err);
        });

        this.users = [...addedUser]
    }

    findUserById(id: number): User | null {
        // Logic to find a user by id in the database
        return this.users.find(user => user.id === id) || null;
    }

    deleteUser(id: number): void {
        // Logic to delete a user by id in the database
        const prevLength: number = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        this.fileService.saveUsers(this.users).then((msg) => {
            this.logger.log(msg);
        }).catch((err) => {
            this.logger.error('Error saving users:', err);
        });
        if (this.users.length === prevLength) {
            throw new Error('User not found');
        }
    }

    updateUser(id: number, user: Partial<SignupDto>): User | null {
        // Logic to update a user by id in the database
        const newUser: Partial<User> = transform(user as SignupDto);

        const existingUser = this.users.find(u => u.id === id);
        if (existingUser) {
            newUser.id = id;
            if (newUser.password !== existingUser.password && newUser.password) {
                this.hashService.hashPassword(newUser.password).then((hashedPassword) => {
                    newUser.password = hashedPassword;
                }).catch((err) => {
                    this.logger.error('Error hashing password:', err);
                });
            }

            Object.assign(existingUser, newUser);
            this.fileService.saveUsers(this.users).then((msg) => {
                this.logger.log(msg);
            }).catch((err) => {
                this.logger.error('Error saving users:', err);
            });
            return existingUser;
        }
        return null;
    }   

    getAllUsers(): User[] {
        // Logic to get all users from the database
        return this.users;
    }

    validateUser(email: string, password: string): User | null {
        // Logic to validate user credentials
        const user = this.users.find(user => user.email === email);
        
        if (user) {
            this.hashService.hashPassword(password).then((hashedPassword) => {
                password = hashedPassword;
            }).catch((err) => {
                this.logger.error('Error hashing password:', err);
            });
        }

        if (user && user.password === password) {
            return user;
        }
        return null;
    }
}