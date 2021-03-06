import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAddressRepository from '../repositories/IAddressRepository';

import Address from '../infra/typeorm/entities/Address';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute(userId: string): Promise<Address> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError('User not found');

    const address = await this.addressRepository.findByIdUser(userId);

    if (!address) throw new AppError('Address not found');

    return address;
  }
}

export default ShowProfileService;
