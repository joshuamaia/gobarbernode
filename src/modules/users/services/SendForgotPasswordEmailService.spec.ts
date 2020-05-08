import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

describe('SendForgotPasswordEmail', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeMailProvider: FakeMailProvider;
  let fakeUserTokenRepository: FakeUserTokensRepository;
  let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository
    );
  });

  it('show be able to recover the password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'joshua@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('show be able to recover a not existing user', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'joshua@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('show generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Joshua',
      email: 'joshua@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'joshua@gmail.com',
    });

    expect(generateToken).toBeCalledWith(user.id);
  });
});
