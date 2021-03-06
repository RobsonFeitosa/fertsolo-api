import { injectable, inject } from 'tsyringe';

import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';

import ISampleCalculationAndInterpretationProvider from '../providers/LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';

import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO';

@injectable()
class IndexLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private limingPlasteringRepository: ILimingPlasteringRepository,

    @inject('SampleCalculationAndInterpretationProvider')
    private sampleCalculationAndInterpretationProvider: ISampleCalculationAndInterpretationProvider,
  ) {}

  public async execute(limitNumber: string): Promise<ISamplesResponseDTO[]> {
    const dataSamples = await this.limingPlasteringRepository.findLimit(
      limitNumber,
    );

    const reports = dataSamples.map(rep => {
      const temp = { ...rep };

      return this.sampleCalculationAndInterpretationProvider.CI(temp);
    });

    return reports;
  }
}

export default IndexLimingPlasteringService;
