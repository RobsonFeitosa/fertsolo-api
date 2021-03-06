import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProfessionalRepository from '../repositories/IProfessionalRepository';

import ICreateProfessionalDTO from '../dtos/ICreateProfessionalDTO';

import Professional from '../infra/typeorm/entities/Professional';

interface IRequest {
  userId: string;
  professionalData: ICreateProfessionalDTO;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute({
    userId,
    professionalData,
  }: IRequest): Promise<Professional> {
    const professional = await this.professionalRepository.findByUserId(userId);

    if (!professional) throw new AppError('Professional does not exist.', 401);

    professional.name = professionalData.name;
    professional.email = professionalData.email;
    professional.address = professionalData.address;
    professional.phone = professionalData.phone;
    professional.crea = professionalData.crea;
    professional.city = professionalData.city;
    professional.uf = professionalData.uf;
    professional.display = professionalData.display;
    professional.profession = professionalData.profession;

    await this.professionalRepository.save(professional);

    return professional;
  }
}

export default UpdateUserAvatarService;
