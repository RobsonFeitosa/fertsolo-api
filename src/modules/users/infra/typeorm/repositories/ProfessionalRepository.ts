import { getRepository, Repository, Like, Raw } from 'typeorm';

import IProfessionalRepository from '@modules/users/repositories/IProfessionalRepository';
import ICreateProfessionalDTO from '@modules/users/dtos/ICreateProfessionalDTO';

import IPaginationOptionsDTO from '@modules/dtos/IPaginationOptionsDTO';

import Professional from '../entities/Professional';

interface IFindAllProfessional {
  data: Professional[];
  total: number;
}

interface IPagationFilterDTO extends IPaginationOptionsDTO {
  city: string;
  uf: string;
  name: string;
}

class ProfessionalRepository implements IProfessionalRepository {
  private ormRepository: Repository<Professional>;

  constructor() {
    this.ormRepository = getRepository(Professional);
  }

  public async create(
    professionalData: ICreateProfessionalDTO,
  ): Promise<Professional> {
    const professional = this.ormRepository.create(professionalData);

    await this.ormRepository.save(professional);

    return professional;
  }

  public async findCount(): Promise<number> {
    const builder = this.ormRepository.createQueryBuilder('professional');

    const total = await builder.getCount();

    return total;
  }

  public async findById(
    professionalId: string,
  ): Promise<Professional | undefined> {
    const professional = await this.ormRepository.findOne(professionalId);

    return professional;
  }

  public async findByUserId(userId: string): Promise<Professional | undefined> {
    const professional = await this.ormRepository.findOne({
      user_id: userId,
    });

    return professional;
  }

  public async findByCrea(crea: string): Promise<Professional | undefined> {
    const professional = await this.ormRepository.findOne({
      where: {
        crea,
      },
    });

    return professional;
  }

  public async findByIdSort(
    searchTermId: string,
  ): Promise<Professional | undefined> {
    const result = await this.ormRepository.findOne({
      id: Like(`%${searchTermId}%`),
    });

    return result;
  }

  public async delete(id: string): Promise<void> {
    const professional = await this.ormRepository.findOne(id);

    if (professional) {
      this.ormRepository.remove(professional);
    }
  }

  public async Index(
    options: IPaginationOptionsDTO,
  ): Promise<IFindAllProfessional> {
    const builder = this.ormRepository.createQueryBuilder('professional');

    const total = await builder.getCount();
    if (options.page && options.limit) {
      const data = await builder
        .skip((options.page - 1) * options.limit)
        .addOrderBy('professional.created_at')
        .take(options.limit)
        .getMany();

      return { total, data };
    }
    const data = await builder.getMany();

    return { total, data };
  }

  public async IndexFilter(
    options: IPagationFilterDTO,
  ): Promise<IFindAllProfessional> {
    function selectWhere() {
      if (options.city) {
        return [
          {
            uf: options.uf,
            city: options.city,
          },
        ];
      }
      if (options.uf) {
        return {
          uf: options.uf,
        };
      }

      return {
        name: Raw(alias => `LOWER(${alias}) ILike '%${options.name}%'`),
      };
    }

    const data = await this.ormRepository.findAndCount({
      where: selectWhere(),

      skip: (options.page - 1) * options.limit,
      order: {
        name: 'ASC',
      },
      take: options.limit,
      cache: true,
    });

    return { total: data[1], data: data[0] };
  }

  public async save(professionalData: Professional): Promise<Professional> {
    return this.ormRepository.save(professionalData);
  }
}

export default ProfessionalRepository;
