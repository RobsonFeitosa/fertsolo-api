import Professional from '../infra/typeorm/entities/Professional';

import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO';
import ICreateProfessionalDTO from '../dtos/ICreateProfessionalDTO';

interface IFindAllProfessional {
  data: Professional[];
  total: number;
}

interface IPagationCityDTO extends IPaginationOptionsDTO {
  city: string;
}

export default interface IProfessionalRepository {
  create(professinoalData: ICreateProfessionalDTO): Promise<Professional>;
  Index(options: IPaginationOptionsDTO): Promise<IFindAllProfessional>;
  findById(id: string): Promise<Professional | undefined>;
  findByUserId(id: string): Promise<Professional | undefined>;
  findByIdSort(searchTermId: string): Promise<Professional | undefined>;
  findByCrea(crea: string): Promise<Professional | undefined>;
  findCount(): Promise<number>;
  IndexFilter(options: IPagationCityDTO): Promise<IFindAllProfessional>;
  delete(id: string): Promise<void>;
  save(professinoalData: Professional): Promise<Professional>;
}
