import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILimingPlasteringRepository from '../repositories/ILimingPlasteringRepository';

import ISampleCalculationAndInterpretationProvider from '../providers/LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';

import ISamplesResponseDTO from '../dtos/ISamplesResponseDTO';

@injectable()
class ShowSortIdLimingPlasteringService {
  constructor(
    @inject('LimingPlasteringRepository')
    private LimingPlasteringRepository: ILimingPlasteringRepository,

    @inject('SampleCalculationAndInterpretationProvider')
    private sampleCalculationAndInterpretationProvider: ISampleCalculationAndInterpretationProvider,
  ) {}

  public async execute(sample_id: string): Promise<ISamplesResponseDTO> {
    if (sample_id.length < 11) {
      throw new AppError('Code sixtase with error');
    }

    const report = await this.LimingPlasteringRepository.findByIdSort(
      sample_id,
    );

    if (!report) {
      throw new AppError('Sample does not found');
    }

    return this.sampleCalculationAndInterpretationProvider.CI(report);
  }
}

export default ShowSortIdLimingPlasteringService;
