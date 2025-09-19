/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseService } from './services/database.service';
import { FileService } from './services/file.service';
import { HashService } from './services/hash.service';

@Module({
    providers: [DatabaseService, FileService, HashService],
    exports: [DatabaseService],
})
export class DatabaseModule {  }