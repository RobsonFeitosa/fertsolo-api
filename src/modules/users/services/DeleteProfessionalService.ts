import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProfessionalRepository from '../repositories/IProfessionalRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute(professionalId: string): Promise<void> {
    const professional = await this.professionalRepository.findById(
      professionalId,
    );

    if (!professional) {
      throw new AppError('professional not found');
    }

    await this.professionalRepository.delete(professionalId);
  }
}

export default DeleteUserService;
