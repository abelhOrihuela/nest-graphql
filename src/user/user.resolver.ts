import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  users() {
    return this.userService.users();
  }

  @Mutation(() => User)
  createUser(
    @Args('email') email: string,
    @Args('name', { nullable: true }) name?: string,
  ) {
    return this.userService.createUser({ email, name });
  }
}
