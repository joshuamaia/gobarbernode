import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw Error('Incorrect email/password combination!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw Error('Incorrect email/password combination!');
    }

    const token = sign({}, '930b1405d00c6e6e1bcf00b2bb3bbb64', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}
