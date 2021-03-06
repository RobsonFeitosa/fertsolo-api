import { getRepository, Repository } from 'typeorm';

import IPublicityRepository from '@modules/users/repositories/IPublicityRepository';
import { ICreatePublicityDTO } from '@modules/users/dtos/IPublicityDTO';

import Publicity from '../entities/Publicity';

class PublicityRepository implements IPublicityRepository {
  private ormRepository: Repository<Publicity>;

  constructor() {
    this.ormRepository = getRepository(Publicity);
  }

  public async create(data: ICreatePublicityDTO): Promise<Publicity> {
    const publicity = this.ormRepository.create(data);

    await this.ormRepository.save(publicity);

    return publicity;
  }

  public async findById(id: string): Promise<Publicity | undefined> {
    const publicity = await this.ormRepository.findOne(id);

    return publicity;
  }

  public async findByLocation(
    location: string,
  ): Promise<Publicity | undefined> {
    const publicity = await this.ormRepository.findOne({
      where: {
        location,
      },
    });

    return publicity;
  }

  public async Index(): Promise<Publicity[]> {
    return this.ormRepository.find();
  }

  public async delete(id: string): Promise<void> {
    const publicity = await this.ormRepository.findOne(id);

    if (publicity) {
      this.ormRepository.remove(publicity);
    }
  }

  public async save(data: Publicity): Promise<Publicity> {
    return this.ormRepository.save(data);
  }
}

export default PublicityRepository;
