// pubSubProvider.ts
import { PubSub } from 'graphql-subscriptions';
// pub-sub.module.ts
import { Module } from '@nestjs/common';

export const pubSubProvider = {
  provide: 'PUB_SUB',
  useValue: new PubSub(),
};

@Module({
  providers: [pubSubProvider],
  exports: ['PUB_SUB'], // make it available to other modules
})
export class PubSubModule {}
