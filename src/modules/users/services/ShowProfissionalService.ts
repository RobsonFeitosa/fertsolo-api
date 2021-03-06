import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProfessionalRepository from '../repositories/IProfessionalRepository';

import Professional from '../infra/typeorm/entities/Professional';

@injectable()
class ShowProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(userId: string): Promise<Professional> {
    const professional = await this.professionalRepository.findByUserId(userId);

    if (!professional) {
      throw new AppError('Professional does not found');
    }

    return professional;
  }
}

export default ShowProfessionalService;
