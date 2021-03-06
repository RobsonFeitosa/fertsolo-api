import { injectable, inject } from 'tsyringe';

import IProfessionalRepository from '../repositories/IProfessionalRepository';
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO';

import Professional from '../infra/typeorm/entities/Professional';

interface IPromiseProfessionals {
  total: number;
  data: Professional[];
}

interface IPagationCityDTO extends IPaginationOptionsDTO {
  city: string;
  uf: string;
  name: string;
}

@injectable()
class IndexFilterProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(
    options: IPagationCityDTO,
  ): Promise<IPromiseProfessionals> {
    const professionals = await this.professionalRepository.IndexFilter(
      options,
    );

    return professionals;
  }
}

export default IndexFilterProfessionalService;
