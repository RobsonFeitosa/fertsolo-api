import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAddressRepository from '../repositories/IAddressRepository';

import Address from '../infra/typeorm/entities/Address';

@injectable()
class ShowProfileService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute(userId: string): Promise<Address> {
    const address = await this.addressRepository.findByIdUser(userId);

    if (!address) throw new AppError('Address not found');

    return address;
  }
}

export default ShowProfileService;
