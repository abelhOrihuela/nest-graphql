import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './user.model';

describe('UserResolver', () => {
  let resolver: UserResolver;

  // Strongly type the mock service as Partial<UserService>
  const mockUserService: Partial<Record<keyof UserService, jest.Mock>> = {
    users: jest
      .fn()
      .mockResolvedValue([
        { id: 1, email: 'a@test.com', name: 'Alice' } as User,
      ]),
    createUser: jest.fn().mockImplementation(
      ({ email, name }: { email: string; name?: string }): User => ({
        id: 2,
        email,
        name,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should return users', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const users = await resolver.users();
    expect(users).toEqual([{ id: 1, email: 'a@test.com', name: 'Alice' }]);
    expect(mockUserService.users).toHaveBeenCalled();
  });

  it('should create a user', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await resolver.createUser('new@test.com', 'Newbie');
    expect(result).toEqual({
      id: 2,
      email: 'new@test.com',
      name: 'Newbie',
    });
    expect(mockUserService.createUser).toHaveBeenCalledWith({
      email: 'new@test.com',
      name: 'Newbie',
    });
  });
});
