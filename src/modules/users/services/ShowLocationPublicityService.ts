import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPublicityRepository from '../repositories/IPublicityRepository';

import Publicity from '../infra/typeorm/entities/Publicity';

@injectable()
class ShowPublicityService {
  constructor(
    @inject('PublicityRepository')
    private publicityRepository: IPublicityRepository,
  ) {}

  public async execute(locationName: string): Promise<Publicity> {
    const pub = await this.publicityRepository.findByLocation(locationName);

    if (!pub) {
      throw new AppError('Publicity not found');
    }

    return pub;
  }
}

export default ShowPublicityService;
