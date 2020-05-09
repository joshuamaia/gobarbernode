import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from './UpdateProfileService';
import AppError from '@shared/errors/AppError';

describe('UpdateProfile', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeHashProvider: FakeHashProvider;
  let updateProfileService: UpdateProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('show be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Joshua 2',
      email: 'joshua2@gmail.com',
    });

    expect(updatedUser.name).toBe('Joshua 2');
    expect(updatedUser.email).toBe('joshua2@gmail.com');
  });

  it('show be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Joshua',
        email: 'joshua@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('show be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Joshua 2',
      email: 'joshua2@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('show be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Joshua 2',
        email: 'joshua2@gmail.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('show be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Joshua 2',
        email: 'joshua2@gmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('show not be able to update the profile from non existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'not-user',
        name: 'Test',
        email: 'teste@example.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
