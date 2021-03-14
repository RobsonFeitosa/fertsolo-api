import IUnitysCreate from '../dtos/IUnitysDTO';
import Unitys from '../infra/typeorm/entities/Unitys';

export default interface ILimingPlasteringResitory {
  create(dataSamples: IUnitysCreate[]): Promise<Unitys[]>;
  findByIdReport(id: string): Promise<Unitys | undefined>;
  delete(id: string): Promise<void>;
  save(dataSamples: Unitys[]): Promise<Unitys[]>;
}
