import Publicity from '../infra/typeorm/entities/Publicity';

import { ICreatePublicityDTO } from '../dtos/IPublicityDTO';

export default interface IPublicityRepository {
  create(data: ICreatePublicityDTO): Promise<Publicity>;
  Index(): Promise<Publicity[]>;
  findById(id: string): Promise<Publicity | undefined>;
  findByLocation(locationName: string): Promise<Publicity | undefined>;
  delete(id: string): Promise<void>;
  save(data: Publicity): Promise<Publicity>;
}
