import { container } from 'tsyringe';

import ISampleCalculationAndInterpretationProvider from './LimingPlasteringProvider/models/ISampleCalculationAndInterpretationProvider';
import SampleCalculationAndInterpretationProvider from './LimingPlasteringProvider/implementations/SampleCalculationAndInterpretationProvider';

container.registerSingleton<ISampleCalculationAndInterpretationProvider>(
  'SampleCalculationAndInterpretationProvider',
  SampleCalculationAndInterpretationProvider,
);
