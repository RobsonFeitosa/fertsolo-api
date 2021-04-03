import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendContactEmailService from '@modules/users/services/SendContactEmailService';

export default class ContactController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, assunto, message } = req.body;

    console.log('process.env.PAGARME_API_KEY');
    console.log(process.env.PAGARME_API_KEY);
    const cendContactEmail = container.resolve(SendContactEmailService);

    await cendContactEmail.execute({
      name,
      email,
      assunto,
      message,
    });

    return res.status(204).json();
  }
}
