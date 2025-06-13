/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService
//   extends PrismaClient
//   implements OnModuleInit, OnModuleDestroy
// {
//   constructor() {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//     super();
//   }

//   async onModuleInit(): Promise<void> {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//     await this.$connect();
//   }

//   async onModuleDestroy(): Promise<void> {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//     await this.$disconnect();
//   }
// }
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
