import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreditCardRepository from '../repositories/ICreditCardRepository';

import ICreditCardDTO from '../../dtos/ICreditCardDTO';

@injectable()
class ShowCreditCardService {
  constructor(
    @inject('CreditCardRepository')
    private creditCardRepository: ICreditCardRepository,
  ) {}

  public async execute(cardId: string): Promise<ICreditCardDTO> {
    const card = await this.creditCardRepository.findByIdCard(cardId);

    if (!card) throw new AppError('Card not found');

    return card;
  }
}

export default ShowCreditCardService;
