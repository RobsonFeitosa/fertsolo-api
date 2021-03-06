import { injectable } from 'tsyringe';

import pagarme from 'pagarme';

@injectable()
class IndexTransactionService {
  public async execute(): Promise<number> {
    const client = await pagarme.client.connect({
      api_key: process.env.PAGARME_API_KEY,
    });

    const transf = await client.transactions.all({ count: 100000 });

    return transf.length;
  }
}

export default IndexTransactionService;
