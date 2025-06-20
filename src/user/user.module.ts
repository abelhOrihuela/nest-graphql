import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PubSubModule } from 'src/pubSubProvider';

@Module({
  imports: [PubSubModule],
  providers: [PrismaService, UserService, UserResolver],
})
export class UserModule {}
