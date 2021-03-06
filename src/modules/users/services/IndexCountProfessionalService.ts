import { injectable, inject } from 'tsyringe';

import IProfessionalRepository from '../repositories/IProfessionalRepository';

@injectable()
class IndexCountProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(): Promise<number> {
    const count = await this.professionalRepository.findCount();

    return count;
  }
}

export default IndexCountProfessionalService;
