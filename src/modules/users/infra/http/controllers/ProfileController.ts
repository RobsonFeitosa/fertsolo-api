import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });
    console.log('process.env.PAGARME_API_KEY');
    console.log(process.env.PAGARME_API_KEY);

    if (true) {
      throw new AppError(`env = ${process.env.PAGARME_API_KEY}`);
    }

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({ user_id, userData: req.body });

    return res.json(classToClass(user));
  }
}
