import ICreateLimingPlasteringDTO from '../../../dtos/ICreateLimingPlasteringDTO';
import ISamplesResponseDTO from '../../../dtos/ISamplesResponseDTO';

export default interface SampleCalculationAndInterpretationProvider {
  CI(data: ICreateLimingPlasteringDTO): ISamplesResponseDTO;
}
