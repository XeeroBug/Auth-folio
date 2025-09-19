/* eslint-disable prettier/prettier */
import { Injectable, Logger } from "@nestjs/common";
import * as fs from 'fs/promises';
import { User } from "../entities/user.entity";

@Injectable()
export class FileService{
    private readonly logger = new Logger(FileService.name);
    private filePath: string = '../data/users.json';

    constructor() {
        // Ensure the data directory exists
        fs.mkdir('../data', { recursive: true }).catch((err: Error) => {
            this.logger.error(`Error creating data directory: ${ err.message ?? 'Unknown error' }`);
        });
    }

    async loadUsers(): Promise<User[]> {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            const users = JSON.parse(data) as User[];
            this.logger.log(`Users loaded from ${this.filePath}`);
            return users;
        } catch (error: any) {
            this.logger.error(`Error loading users from ${this.filePath}: ${ error?.message ?? 'Unknown error' }`);
            return [];
        }
    }

    async saveUsers(users: User[]): Promise<string> {
        await fs.writeFile(this.filePath, JSON.stringify(users));
        this.logger.log(`Users saved to ${this.filePath}`);
        return `Users saved to ${this.filePath}`;
    }
}