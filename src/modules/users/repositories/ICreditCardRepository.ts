import CreditCard from '../infra/typeorm/entities/CreditCard';

import ICreditCardDTO from '../../dtos/ICreditCardDTO';
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO';

interface IFindAllCreditCard {
  data: ICreditCardDTO[];
  total: number;
}

export default interface ICreditCardRepository {
  create(creditData: ICreditCardDTO): Promise<CreditCard>;
  findById(cardId: string): Promise<CreditCard | undefined>;
  findByCardId(cardId: string): Promise<CreditCard | undefined>;
  findByUserId(userId: string): Promise<CreditCard | undefined>;
  findByNumber(number: string): Promise<CreditCard | undefined>;
  Index(options: IPaginationOptionsDTO): Promise<IFindAllCreditCard>;
  delete(cardId: string): Promise<void>;
  save(creditData: CreditCard): Promise<CreditCard>;
}
