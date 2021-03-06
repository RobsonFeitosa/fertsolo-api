import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';

import ISampleCalculationAndInterpretationProvider from '../providers/LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';

import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO';
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO';

interface IFindAllOfUserLimingPlastering extends IPaginationOptionsDTO {
  nameUser: string;
}

interface IPromiseSample {
  total: number;
  data: ISamplesResponseDTO[];
}

@injectable()
class ShowSortIdLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private LimingPlasteringRepository: ILimingPlasteringRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('SampleCalculationAndInterpretationProvider')
    private sampleCalculationAndInterpretationProvider: ISampleCalculationAndInterpretationProvider,
  ) {}

  public async execute(
    options: IFindAllOfUserLimingPlastering,
  ): Promise<IPromiseSample> {
    const user = await this.usersRepository.findUserForName(options.nameUser);

    if (!user) {
      throw new AppError('User does not found');
    }

    const dataSamples = await this.LimingPlasteringRepository.findAll({
      limit: options.limit,
      page: options.page,
      user_id: user.id,
    });

    const reports = dataSamples.data.map(rep => {
      const temp = { ...rep };

      return this.sampleCalculationAndInterpretationProvider.CI(temp);
    });

    return { total: dataSamples.total, data: reports };
  }
}

export default ShowSortIdLimingPlasteringService;
