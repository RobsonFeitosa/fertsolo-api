import { injectable, inject } from 'tsyringe';

import Samples from '../infra/typeorm/entities/Samples';
import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';

import ISampleCalculationAndInterpretationProvider from '../providers/LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';

import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO';
import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO';

interface IFindAllOfUserLimingPlastering extends IPaginationOptionsDTO {
  user_id: string;
}

interface IPromiseSample {
  total: number;
  data: ISamplesResponseDTO[];
}

@injectable()
class IndexLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private limingPlasteringRepository: ILimingPlasteringRepository,

    @inject('SampleCalculationAndInterpretationProvider')
    private sampleCalculationAndInterpretationProvider: ISampleCalculationAndInterpretationProvider,
  ) {}

  public async execute(
    options: IFindAllOfUserLimingPlastering,
  ): Promise<IPromiseSample> {
    const dataSamples = await this.limingPlasteringRepository.findAll(options);

    const reports = dataSamples.data.map(rep => {
      const temp = { ...rep };

      return this.sampleCalculationAndInterpretationProvider.CI(temp);
    });

    return { total: dataSamples.total, data: reports };
  }
}

export default IndexLimingPlasteringService;
