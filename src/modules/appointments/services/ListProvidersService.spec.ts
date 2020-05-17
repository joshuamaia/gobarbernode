import 'reflect-metadata';

import ListProvidersService from './ListProvidersService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('ListProviders', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let listProvidersService: ListProvidersService;
  let fakeCacheProvider: FakeCacheProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  });

  it('show be able to list the providers', async () => {
    const u1 = await fakeUsersRepository.create({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    const u2 = await fakeUsersRepository.create({
      name: 'Joshua 2',
      email: 'joshua2@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Joshua 3',
      email: 'joshua3@gmail.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: user.id,
    });

    expect(providers).toEqual([u1, u2]);
  });
});
