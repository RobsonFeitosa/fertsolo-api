import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreditCardRepository from '../repositories/ICreditCardRepository';
import IUsersRepository from '../repositories/IUsersRepository';

import ICreditCardDTO from '../../dtos/ICreditCardDTO';

interface IRequest {
  creditCard: ICreditCardDTO;
}

@injectable()
class CreateCreditCardService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ creditCard }: IRequest): Promise<ICreditCardDTO> {
    const { user_id, number } = creditCard;

    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    const cardCheckExist = await this.creditCardRepository.findByNumber(number);

    if (cardCheckExist) throw new AppError('Card already exist', 400);

    const card = await this.creditCardRepository.create(creditCard);

    return card;
  }
}

export default CreateCreditCardService;
