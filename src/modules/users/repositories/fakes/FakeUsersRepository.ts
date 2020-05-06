import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/Users';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => {
      return user.email === email;
    });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => {
      return user.id === id;
    });
    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, data);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(u => {
      return u.id === user.id;
    });

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
