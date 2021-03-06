import { injectable, inject } from 'tsyringe';

import ICreditCardRepository from '../repositories/ICreditCardRepository';

import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO';

import ICreditCardDTO from '../../dtos/ICreditCardDTO';

interface IPromiseCards {
  total: number;
  data: ICreditCardDTO[];
}

@injectable()
class IndexCardService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository,
  ) {}

  public async execute(options: IPaginationOptionsDTO): Promise<IPromiseCards> {
    const cards = await this.creditCardRepository.Index(options);

    return cards;
  }
}

export default IndexCardService;
