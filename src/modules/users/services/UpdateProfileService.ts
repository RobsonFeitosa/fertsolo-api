import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  userData: ICreateUserDTO;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user_id, userData }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    user.name = userData.name;
    user.email = userData.email;

    user.cpf = userData.cpf;
    user.phone_number = userData.phone_number;

    if (userData.password && !userData.old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (userData.password && userData.old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        userData.old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(userData.password);
    }
    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
