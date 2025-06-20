import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { StatusResolver } from './status/status.resolver';
import { StatusModule } from './status/status.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // installSubscriptionHandlers: true,
      // path: '/graphql',

      subscriptions: {
        'graphql-ws': true,
      },
      introspection: true,

      // playground: true,
    }),
    StatusModule,
    UserModule,
  ],
  providers: [StatusResolver],
})
export class AppModule {}
