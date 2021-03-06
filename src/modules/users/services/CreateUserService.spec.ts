import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('CreateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let fakeCacheProvider: FakeCacheProvider;
  let createUserService: CreateUserService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('show be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('joshua@gmail.com');
  });

  it('show not be able to create a new user with same email', async () => {
    const user = await createUserService.execute({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Joshua',
        email: 'joshua@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
