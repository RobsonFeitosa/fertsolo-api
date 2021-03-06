import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPublicityRepository from '../repositories/IPublicityRepository';

import Publicity from '../infra/typeorm/entities/Publicity';

interface IRequest {
  locationName: string;
  link: string;
  details: string;
  display: boolean;
}

@injectable()
class UpdateAddressService {
  constructor(
    @inject('PublicityRepository')
    private publicityRepository: IPublicityRepository,
  ) {}

  public async execute({
    locationName,
    link,
    details,
    display,
  }: IRequest): Promise<Publicity> {
    const publicity = await this.publicityRepository.findByLocation(
      locationName,
    );

    if (!publicity) throw new AppError('Publicity not found');

    publicity.link = link;
    publicity.details = details;
    publicity.display = display;

    return this.publicityRepository.save(publicity);
  }
}

export default UpdateAddressService;
