import { injectable, inject } from 'tsyringe';

import pagarme from 'pagarme';
import IUsersRepository from '../repositories/IUsersRepository';
import ICreditCardRepository from '../repositories/ICreditCardRepository';
import { ITransactionDTO } from '../../dtos/ITransactionsDTO';
import IPaginationOptionsDTO from '../../dtos/IPaginationOptionsDTO';

interface ITransactions {
  total: number;
  data: ITransactionDTO[];
}

@injectable()
class IndexTransactionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository,
  ) {}

  public async execute(options: IPaginationOptionsDTO): Promise<ITransactions> {
    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });

    const transactions = await client.transactions.all({
      count: options.limit,
      page: options.page,
    });

    return { total: transactions.length, data: transactions };
  }
}

export default IndexTransactionService;
