import { Float, Query, Resolver } from '@nestjs/graphql';
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

  @Query(() => Float, { name: 'randomNumberZeroTo' })
  getRandomFromZeroTo(): number {
    return Math.floor(Math.random() * 11);
  }
}
