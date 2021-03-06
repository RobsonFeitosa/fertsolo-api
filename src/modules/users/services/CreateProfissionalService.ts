import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IProfessionalRepository from '../repositories/IProfessionalRepository';

import ICreateProfessionalDTO from '../dtos/ICreateProfessionalDTO';

import Professional from '../infra/typeorm/entities/Professional';

interface IRequest {
  user_id: string;
  dataProfessional: ICreateProfessionalDTO;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,
  ) {}

  public async execute({
    user_id,
    dataProfessional,
  }: IRequest): Promise<Professional> {
    const professionalUser = await this.professionalRepository.findByUserId(
      user_id,
    );

    if (professionalUser)
      throw new AppError('Professional for its user already  exist', 400);

    const professionalCrea = await this.professionalRepository.findByCrea(
      dataProfessional.crea,
    );

    if (professionalCrea) throw new AppError('Professional already exist', 400);

    const newDataProfessional: ICreateProfessionalDTO = {
      ...dataProfessional,
    } as ICreateProfessionalDTO;
    newDataProfessional.user_id = user_id;

    const professional = await this.professionalRepository.create(
      newDataProfessional,
    );

    return professional;
  }
}

export default CreateUserService;
