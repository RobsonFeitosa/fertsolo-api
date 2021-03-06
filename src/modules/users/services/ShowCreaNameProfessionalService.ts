import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IProfessionalRepository from '../repositories/IProfessionalRepository';

import Professional from '../infra/typeorm/entities/Professional';

@injectable()
class ShowCreaNameProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(crea: string): Promise<Professional> {
    const professional = await this.professionalRepository.findByCrea(crea);

    if (!professional) {
      throw new AppError('Professional does not found');
    }

    return professional;
  }
}

export default ShowCreaNameProfessionalService;
