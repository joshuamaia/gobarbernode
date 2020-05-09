import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';
import AppError from '@shared/errors/AppError';

describe('UpdateProfile', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let showProfileService: ShowProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('show be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Joshua');
    expect(profile.email).toBe('joshua@gmail.com');
  });

  it('show not be able to show the profile from non existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'not-user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
