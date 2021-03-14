import Samples from '../infra/typeorm/entities/Samples';
import { ICreateLimingPlastering } from '../dtos/ICreateLimingPlasteringDTO';
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO';

interface IFindAllLimingPlastering {
  data: Samples[];
  total: number;
}

interface IFindFilter extends IPaginationOptionsDTO {
  min: number;
  max: number;
  unity: string;
}

interface IFindAllOfUserLimingPlastering extends IPaginationOptionsDTO {
  user_id: string;
}

export default interface ILimingPlasteringResitory {
  create(dataSamples: ICreateLimingPlastering[]): Promise<Samples[]>;
  findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<IFindAllLimingPlastering>;
  findChart(): Promise<Samples[]>;
  findCount(): Promise<number>;
  findLimit(limit: string): Promise<Samples[]>;
  findById(id: string): Promise<Samples | undefined>;
  findByIdSort(searchTermId: string): Promise<Samples | undefined>;
  findPh(options: IFindFilter): Promise<IFindAllLimingPlastering>;
  findAll(
    options: IFindAllOfUserLimingPlastering,
  ): Promise<IFindAllLimingPlastering>;
  delete(id: string): Promise<void>;
  save(dataSamples: Samples[]): Promise<Samples[]>;
}
