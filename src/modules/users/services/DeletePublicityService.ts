import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPublicityRepository from '../repositories/IPublicityRepository';

@injectable()
class DeletePublicityService {
  constructor(
    @inject('PublicityRepository')
    private publicityRepository: IPublicityRepository,
  ) {}

  public async execute(pub_id: string): Promise<void> {
    const publicity = await this.publicityRepository.findById(pub_id);

    if (!publicity) {
      throw new AppError('Publicity not found');
    }

    await this.publicityRepository.delete(pub_id);
  }
}

export default DeletePublicityService;
