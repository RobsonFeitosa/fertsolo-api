import { getRepository, Repository } from 'typeorm';

import IUnitysLimingPlasteringRepository from '@modules/calculations/repositories/IUnitysLimingPlasteringRepository';
import IUnitysDTO from '@modules/calculations/dtos/IUnitysDTO';

import Unitys from '../entities/Unitys';

class UnitysLimingPlasteringRepository
  implements IUnitysLimingPlasteringRepository {
  private ormRepository: Repository<Unitys>;

  constructor() {
    this.ormRepository = getRepository(Unitys);
  }

  public async create(dataSamples: IUnitysDTO[]): Promise<Unitys[]> {
    const limingPlastering = this.ormRepository.create(dataSamples);

    await this.ormRepository.save(limingPlastering);

    return limingPlastering;
  }

  public async findByIdReport(id: string): Promise<Unitys | undefined> {
    const result = await this.ormRepository.findOne({
      where: {
        report_id: id,
      },
    });

    return result;
  }

  public async delete(id: string): Promise<void> {
    const sample = await this.ormRepository.findOne(id);

    if (sample) {
      this.ormRepository.remove(sample);
    }
  }

  public async save(dataSamples: Unitys[]): Promise<Unitys[]> {
    return this.ormRepository.save(dataSamples);
  }
}

export default UnitysLimingPlasteringRepository;
