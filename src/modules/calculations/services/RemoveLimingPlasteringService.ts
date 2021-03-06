import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';

@injectable()
class RemoveLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private LimingPlasteringRepository: ILimingPlasteringRepository,
  ) {}

  public async execute(sample_id: string): Promise<void> {
    const sample = await this.LimingPlasteringRepository.findById(sample_id);

    if (!sample) {
      throw new AppError('Sample does not found');
    }

    await this.LimingPlasteringRepository.delete(sample_id);
  }
}

export default RemoveLimingPlasteringService;
