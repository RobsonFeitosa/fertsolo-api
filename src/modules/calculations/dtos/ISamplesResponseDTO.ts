import Samples from '../infra/typeorm/entities/Samples';

interface IUnity {
  unity: string;
  value: number;
}

export default interface ISamplesResponseDTO
  extends Omit<Samples, 'tb_1_clay'> {
  tb_1_clay: IUnity;
}
