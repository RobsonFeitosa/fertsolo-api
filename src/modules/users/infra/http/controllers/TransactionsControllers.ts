import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from '@modules/users/services/CreateTransactionService';
import IndexTransactionService from '@modules/users/services/IndexTransactionService';
import IndexCountTransactionsService from '@modules/users/services/IndexCountTransactionsService';

export default class TransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const crateTransaction = container.resolve(CreateTransactionService);
    const transaction = await crateTransaction.execute({
      user_id: userId,
      transaction: req.body,
    });

    return res.json(transaction);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit } = request.query;

    const indexTransactions = container.resolve(IndexTransactionService);

    const transaction = await indexTransactions.execute({
      page: Number(page),
      limit: Number(limit),
    });

    return response.json(transaction);
  }

  public async indexCount(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const indexTransactions = container.resolve(IndexCountTransactionsService);

    const transaction = await indexTransactions.execute();

    return response.json(transaction);
  }
}
