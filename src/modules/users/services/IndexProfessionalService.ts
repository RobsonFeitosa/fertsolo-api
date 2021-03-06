import { injectable, inject } from 'tsyringe';

import IProfessionalRepository from '../repositories/IProfessionalRepository';
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO';

import Professional from '../infra/typeorm/entities/Professional';

interface IPromiseProfessionals {
  total: number;
  data: Professional[];
}

@injectable()
class IndexProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(
    options: IPaginationOptionsDTO,
  ): Promise<IPromiseProfessionals> {
    const professionals = await this.professionalRepository.Index(options);

    return professionals;
  }
}

export default IndexProfessionalService;
