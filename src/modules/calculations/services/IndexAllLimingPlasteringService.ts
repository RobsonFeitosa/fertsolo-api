import { injectable, inject } from 'tsyringe';

import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';

import ISampleCalculationAndInterpretationProvider from '../providers/LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';

import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO';
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO';

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
    options: IPaginationOptionsDTO,
  ): Promise<IPromiseSample> {
    const dataSamples = await this.limingPlasteringRepository.findAndCount(
      options,
    );

    const reports = dataSamples.data.map(rep => {
      const temp = { ...rep };

      return this.sampleCalculationAndInterpretationProvider.CI(temp);
    });

    return { total: dataSamples.total, data: reports };
  }
}

export default IndexLimingPlasteringService;
