import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(userData: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(
      userData.email,
    );

    if (checkUserExists) {
      throw new AppError('Emal address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(
      userData.password,
    );

    const user = await this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
