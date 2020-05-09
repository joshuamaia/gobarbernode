import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeStorageProvider: FakeStorageProvider;
  let fakeHashProvider: FakeHashProvider;
  let createUserService: CreateUserService;
  let updateUserAvatarService: UpdateUserAvatarService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );
  });

  it('show be able to update avatar', async () => {
    const user = await createUserService.execute({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('show not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'non-exist-user',
        avatarFileName: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('show delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await createUserService.execute({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toBeCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
