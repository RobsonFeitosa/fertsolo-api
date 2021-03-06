import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import pagarme from 'pagarme';
import IUsersRepository from '../repositories/IUsersRepository';
import ICreditCardRepository from '../repositories/ICreditCardRepository';
import { ICreateTransactionDTO } from '../../dtos/ITransactionsDTO';

interface IRequest {
  transaction: ICreateTransactionDTO;
  user_id: string;
}

@injectable()
class CreateTransactionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository,
  ) {}

  public async execute({ user_id, transaction }: IRequest): Promise<IRequest> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    const { card_hash, card_id } = transaction;

    let card;
    if (card_id) {
      card = await this.creditCardRepository.findByCardId(card_id);
    }

    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });

    const pagarmeTransaction = await client.transactions.create({
      ...transaction,
      ...(card_hash ? { card_hash } : { card_id: card && card.card_id }),
    });

    return { transaction: pagarmeTransaction, user_id: user.id };
  }
}

export default CreateTransactionService;
