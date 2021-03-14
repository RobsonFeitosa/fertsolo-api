import { ICreateLimingPlasteringUnitys } from '../../../dtos/ICreateLimingPlasteringDTO';
import ISamplesResponseDTO from '../../../dtos/ISamplesResponseDTO';

interface ICalculatedLimingPlastering extends ICreateLimingPlasteringUnitys {
  created_at: Date;
  updated_at: Date;
}

export default interface SampleCalculationAndInterpretationProvider {
  CI(data: ICalculatedLimingPlastering): ISamplesResponseDTO;
}
