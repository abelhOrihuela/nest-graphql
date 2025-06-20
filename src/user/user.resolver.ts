import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject('PUB_SUB') private readonly pubSub: PubSubEngine,
  ) {}

  @Query(() => [User])
  users() {
    return this.userService.users();
  }

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('name', { nullable: true }) name?: string,
  ) {
    const user = await this.userService.createUser({ email, name });
    const allUsers = await this.userService.users();

    await this.pubSub.publish('usersUpdated', { usersUpdated: allUsers });

    return user;
  }

  @Subscription(() => [User], {
    name: 'usersUpdated',
  })
  usersUpdated() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.pubSub.asyncIterableIterator('usersUpdated');
  }
}
