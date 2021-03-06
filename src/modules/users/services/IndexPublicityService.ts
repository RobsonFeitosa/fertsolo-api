import { injectable, inject } from 'tsyringe';

import IPublicityRepository from '../repositories/IPublicityRepository';

import Publicity from '../infra/typeorm/entities/Publicity';

@injectable()
class IndexUsersService {
  constructor(
    @inject('PublicityRepository')
    private publicityRepository: IPublicityRepository,
  ) {}

  public async execute(): Promise<Publicity[]> {
    const publicity = await this.publicityRepository.Index();

    return publicity;
  }
}

export default IndexUsersService;
