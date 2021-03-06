import { getRepository, Repository } from 'typeorm';

import ICreditCardRepository from '@modules/users/repositories/ICreditCardRepository';
import ICreditCardDTO from '@modules/dtos/ICreditCardDTO';
import IPaginationOptionsDTO from '../../../../dtos/IPaginationOptionsDTO';

import CreditCard from '../entities/CreditCard';

interface IFindAllCreditCard {
  data: ICreditCardDTO[];
  total: number;
}

class CreditCardRepository implements ICreditCardRepository {
  private ormRepository: Repository<CreditCard>;

  constructor() {
    this.ormRepository = getRepository(CreditCard);
  }

  public async create(creditData: ICreditCardDTO): Promise<CreditCard> {
    const card = this.ormRepository.create(creditData);

    await this.ormRepository.save(card);

    return card;
  }

  public async findById(cardId: string): Promise<CreditCard | undefined> {
    const card = await this.ormRepository.findOne(cardId);

    return card;
  }

  public async findByCardId(cardId: string): Promise<CreditCard | undefined> {
    const card = await this.ormRepository.findOne({
      where: {
        card_id: cardId,
      },
    });

    return card;
  }

  public async findByUserId(userId: string): Promise<CreditCard | undefined> {
    const card = await this.ormRepository.findOne({
      where: {
        user_id: userId,
      },
    });

    return card;
  }

  public async findByNumber(number: string): Promise<CreditCard | undefined> {
    const card = await this.ormRepository.findOne({
      where: {
        number,
      },
    });

    return card;
  }

  public async Index(
    options: IPaginationOptionsDTO,
  ): Promise<IFindAllCreditCard> {
    const data = await this.ormRepository.findAndCount({
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: {
        created_at: 'ASC',
      },
      cache: true,
    });

    return { total: data[1], data: data[0] };
  }

  public async delete(cardId: string): Promise<void> {
    const card = await this.ormRepository.findOne(cardId);

    if (card) {
      this.ormRepository.remove(card);
    }
  }

  public async save(creditData: CreditCard): Promise<CreditCard> {
    return this.ormRepository.save(creditData);
  }
}

export default CreditCardRepository;
