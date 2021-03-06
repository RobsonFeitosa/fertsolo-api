import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfessionalAvatarService from '@modules/users/services/UpdateProfessionalAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { professionalId } = req.params;

    const updateProfessionalAvatar = container.resolve(
      UpdateProfessionalAvatarService,
    );

    const professional = await updateProfessionalAvatar.execute({
      professionalId,
      avatarFilename: req.file.filename,
    });

    return res.json(classToClass(professional));
  }
}
