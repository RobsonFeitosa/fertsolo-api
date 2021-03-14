import { getRepository, Repository, Brackets, Raw } from 'typeorm';

import ILimingPlasteringRepository from '@modules/calculations/repositories/ILimingPlasteringRepository';
import { ICreateLimingPlastering } from '@modules/calculations/dtos/ICreateLimingPlasteringDTO';

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO';

import Samples from '../entities/Samples';

interface IFindAllOfUserLimingPlastering extends IPaginationOptionsDTO {
  user_id: string;
}

interface IFindAllLimingPlastering {
  data: Samples[];
  total: number;
}

interface IFindFilter extends IPaginationOptionsDTO {
  min: number;
  max: number;
  unity: string;
}

class LimingPlasteringRepository implements ILimingPlasteringRepository {
  private ormRepository: Repository<Samples>;

  constructor() {
    this.ormRepository = getRepository(Samples);
  }

  public async create(
    dataSamples: ICreateLimingPlastering[],
  ): Promise<Samples[]> {
    const limingPlastering = this.ormRepository.create(dataSamples);

    await this.ormRepository.save(limingPlastering);

    return limingPlastering;
  }

  public async findAndCount(
    options: IPaginationOptionsDTO,
  ): Promise<IFindAllLimingPlastering> {
    const builder = this.ormRepository.createQueryBuilder(
      'report_liming_plastering',
    );

    const total = await builder.getCount();
    if (options.page && options.limit) {
      const data = await builder
        .skip((options.page - 1) * 9)
        .orderBy({
          'report_liming_plastering.created_at': 'DESC',
        })
        .take(9)
        .getMany();

      return { total, data };
    }
    const data = await builder.getMany();

    return { total, data };
  }

  public async findLimit(limit: string): Promise<Samples[]> {
    const builder = this.ormRepository.createQueryBuilder(
      'report_liming_plastering',
    );

    if (limit) {
      const data = await builder
        .orderBy({
          'report_liming_plastering.created_at': 'DESC',
        })
        .take(Number(limit))
        .getMany();

      return data;
    }
    const data = await builder.getMany();

    return data;
  }

  public async findAll(
    options: IFindAllOfUserLimingPlastering,
  ): Promise<IFindAllLimingPlastering> {
    const builder = this.ormRepository.createQueryBuilder(
      'report_liming_plastering',
    );

    const total = await builder
      .where('report_liming_plastering.user_id = :user_id', {
        user_id: options.user_id,
      })
      .getCount();

    if (options.page && options.limit) {
      const data = await builder
        .skip((options.page - 1) * options.limit)
        .orderBy({
          'report_liming_plastering.created_at': 'DESC',
        })
        .take(options.limit)
        .where('report_liming_plastering.user_id = :user_id', {
          user_id: options.user_id,
        })
        .getMany();

      return { total, data };
    }
    const data = await builder.getMany();

    return { total, data };
  }

  public async findChart(): Promise<Samples[]> {
    const builder = this.ormRepository.createQueryBuilder(
      'report_liming_plastering',
    );

    const data = await builder
      .orderBy({
        'report_liming_plastering.created_at': 'DESC',
      })
      .getMany();

    return data;
  }

  public async findCount(): Promise<number> {
    const builder = this.ormRepository.createQueryBuilder(
      'report_liming_plastering',
    );

    const total = await builder.getCount();

    return total;
  }

  public async findById(id: string): Promise<Samples | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByIdSort(
    searchTermId: string,
  ): Promise<Samples | undefined> {
    const result = await this.ormRepository.findOne({
      where: {
        id: Raw(alias => `${alias} ILIKE '%${searchTermId}%'`),
      },
    });
    return result;
  }

  public async findPh(options: IFindFilter): Promise<IFindAllLimingPlastering> {
    const builder = this.ormRepository.createQueryBuilder(
      'report_liming_plastering',
    );

    const total = await builder
      .where(
        new Brackets(qb => {
          qb.where('report_liming_plastering.tb_2_ph >= :tbphMin', {
            tbphMin: `{"unity":${options.unity},"value":${options.min}}`,
          }).andWhere('report_liming_plastering.tb_2_ph <= :tbphMax', {
            tbphMax: `{"unity":${options.unity},"value":${options.max}}`,
          });
        }),
      )
      .getCount();

    if (options.page && options.limit) {
      const data = await builder
        .skip((options.page - 1) * options.limit)
        .addOrderBy('report_liming_plastering.created_at')
        .where(
          new Brackets(qb => {
            qb.where('report_liming_plastering.tb_2_ph >= :tbphMin', {
              tbphMin: `{"unity":${options.unity},"value":${options.min}}`,
            }).andWhere('report_liming_plastering.tb_2_ph <= :tbphMax', {
              tbphMax: `{"unity":${options.unity},"value":${options.max}}`,
            });
          }),
        )
        .take(options.limit)
        .getMany();

      return { total, data };
    }

    const data = await builder.getMany();

    return { total, data };
  }

  public async delete(id: string): Promise<void> {
    const sample = await this.ormRepository.findOne(id);

    if (sample) {
      this.ormRepository.remove(sample);
    }
  }

  public async save(dataSamples: Samples[]): Promise<Samples[]> {
    return this.ormRepository.save(dataSamples);
  }
}

export default LimingPlasteringRepository;
