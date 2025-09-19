/* eslint-disable prettier/prettier */
import { Injectable, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    private readonly logger = new Logger(HashService.name);

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        this.logger.log(`User password hashed successfully to ${hash}`);
        return hash;
    }

    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    } 
}