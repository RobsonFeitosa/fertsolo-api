import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';

import ISampleCalculationAndInterpretationProvider from '../providers/LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';

import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO';

@injectable()
class ShowLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private LimingPlasteringRepository: ILimingPlasteringRepository,

    @inject('SampleCalculationAndInterpretationProvider')
    private sampleCalculationAndInterpretationProvider: ISampleCalculationAndInterpretationProvider,
  ) {}

  public async execute(sample_id: string): Promise<ISamplesResponseDTO> {
    const report = await this.LimingPlasteringRepository.findById(sample_id);

    if (!report) {
      throw new AppError('Sample does not found');
    }

    return this.sampleCalculationAndInterpretationProvider.CI(report);
  }
}

export default ShowLimingPlasteringService;
