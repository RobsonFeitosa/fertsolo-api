import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProfissionalService from '@modules/users/services/CreateProfissionalService';
import ShowProfissionalService from '@modules/users/services/ShowProfissionalService';
import UpdateProfessionalService from '@modules/users/services/UpdateProfessionalService';
import DeleteProfessionalService from '@modules/users/services/DeleteProfessionalService';
import IndexProfessionalService from '@modules/users/services/IndexProfessionalService';

export default class ProfessionalController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const dataProfessional = req.body;

    const createProfissional = container.resolve(CreateProfissionalService);

    const profissonal = await createProfissional.execute({
      dataProfessional,
      user_id,
    });

    return res.json(classToClass(profissonal));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const showProfessional = container.resolve(ShowProfissionalService);

    const professional = await showProfessional.execute(userId);

    return res.json(classToClass(professional));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit } = request.query;

    const indexProfessional = container.resolve(IndexProfessionalService);

    const professional = await indexProfessional.execute({
      page: Number(page),
      limit: Number(limit),
    });

    return response.json(classToClass(professional));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const professionalData = req.body;

    const updateProfessional = container.resolve(UpdateProfessionalService);

    const professional = await updateProfessional.execute({
      professionalData,
      userId,
    });

    return res.json(classToClass(professional));
  }

  public async delete(request: Request, response: Response): Promise<any> {
    const { professionalId } = request.params;

    const deleteProfessional = container.resolve(DeleteProfessionalService);

    await deleteProfessional.execute(professionalId);

    return response.status(204).send();
  }
}
