import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IProfessionalRepository from '../repositories/IProfessionalRepository';

import Professional from '../infra/typeorm/entities/Professional';

@injectable()
class ShowSortIdProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(professionalId: string): Promise<Professional> {
    if (professionalId.length < 11) {
      throw new AppError('Code sixtase with error');
    }

    const professional = await this.professionalRepository.findByIdSort(
      professionalId,
    );

    if (!professional) {
      throw new AppError('Professional does not found');
    }

    return professional;
  }
}

export default ShowSortIdProfessionalService;
