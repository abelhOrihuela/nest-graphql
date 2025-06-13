import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  providers: [PrismaService, UserService, UserResolver],
})
export class UserModule {}
