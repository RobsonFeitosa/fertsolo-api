import { injectable, inject } from 'tsyringe';

import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';

import ISampleCalculationAndInterpretationProvider from '../providers/LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';

import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO';
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO';

interface IPromiseSample {
  total: number;
  data: ISamplesResponseDTO[];
}

interface IRequest extends IPaginationOptionsDTO {
  min: number;
  max: number;
  unity: string;
}

@injectable()
class IndexPhLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private LimingPlasteringRepository: ILimingPlasteringRepository,

    @inject('SampleCalculationAndInterpretationProvider')
    private sampleCalculationAndInterpretationProvider: ISampleCalculationAndInterpretationProvider,
  ) {}

  public async execute(options: IRequest): Promise<IPromiseSample> {
    const dataSamples = await this.LimingPlasteringRepository.findPh({
      limit: options.limit,
      page: options.page,
      min: options.min,
      max: options.max,
      unity: options.unity,
    });

    const reports = dataSamples.data.map(rep => {
      const temp = { ...rep };

      return this.sampleCalculationAndInterpretationProvider.CI(temp);
    });

    return { total: dataSamples.total, data: reports };
  }
}

export default IndexPhLimingPlasteringService;
