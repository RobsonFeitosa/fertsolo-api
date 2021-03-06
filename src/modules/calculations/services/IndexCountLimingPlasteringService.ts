import { injectable, inject } from 'tsyringe';

import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';

@injectable()
class IndexCountLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private limingPlasteringRepository: ILimingPlasteringRepository,
  ) {}

  public async execute(): Promise<number> {
    const count = await this.limingPlasteringRepository.findCount();

    return count;
  }
}

export default IndexCountLimingPlasteringService;
