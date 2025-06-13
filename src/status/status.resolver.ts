import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class Status {
  @Field()
  message: string;
  @Field()
  date: string;
}

@Resolver(() => Status)
export class StatusResolver {
  @Query(() => Status, { name: 'GetStatus' })
  getStatus(): Status {
    return { message: 'Hello, GraphQL!', date: new Date().toDateString() };
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random();
  }

  @Query(() => Int, { name: 'randomNumberZeroTo' })
  getRandomFromZeroTo(
    @Args('to', { type: () => Int, nullable: true }) to: number = 6,
  ): number {
    return Math.floor(Math.random() * to);
  }
}
