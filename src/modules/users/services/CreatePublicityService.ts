import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPublicityRepository from '../repositories/IPublicityRepository';
import IUsersRepository from '../repositories/IUsersRepository';

import { ICreatePublicityDTO } from '../dtos/IPublicityDTO';

import Publicity from '../infra/typeorm/entities/Publicity';

interface ICreatePublicityUserIdDTO extends ICreatePublicityDTO {
  user_id: string;
}

@injectable()
class CreatePublicityService {
  constructor(
    @inject('PublicityRepository')
    private publicityRepository: IPublicityRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: ICreatePublicityUserIdDTO): Promise<Publicity> {
    const { user_id, link, details, display, location } = data;
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const publicity = await this.publicityRepository.create({
      link,
      details,
      display,
      location,
    });

    return publicity;
  }
}

export default CreatePublicityService;
