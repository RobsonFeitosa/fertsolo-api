import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateLimingPlasteringService from '@modules/calculations/services/CreateLimingPlasteringService';
import UpdateLimingPlasteringService from '@modules/calculations/services/UpdateLimingPlasteringService';
import IndexLimingPlasteringService from '@modules/calculations/services/IndexLimingPlasteringService';
import ShowLimingPlasteringService from '@modules/calculations/services/ShowLimingPlasteringService';
import RemoveLimingPlasteringService from '@modules/calculations/services/RemoveLimingPlasteringService';

export default class CalculationsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const dataSamples = req.body;

    const createLimingPlastering = container.resolve(
      CreateLimingPlasteringService,
    );

    const sample = await createLimingPlastering.execute({
      user_id: userId,
      dataSamples,
    });

    return res.json(classToClass(sample));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { sampleId } = req.params;

    const showSample = container.resolve(ShowLimingPlasteringService);

    const sample = await showSample.execute(sampleId);

    return res.json(classToClass(sample));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { page = 1, limit } = req.query;

    const indexLimingPlasterings = container.resolve(
      IndexLimingPlasteringService,
    );

    const response = await indexLimingPlasterings.execute({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      user_id,
    });

    return res.json(response);
  }

  public async delete(request: Request, response: Response): Promise<any> {
    const { sampleId } = request.params;

    const removeLiming = container.resolve(RemoveLimingPlasteringService);

    await removeLiming.execute(sampleId);

    return response.status(204).send();
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { sampleId } = req.params;
    const dataSample = req.body;

    const updateLimingPlastering = container.resolve(
      UpdateLimingPlasteringService,
    );

    const limingPlastering = await updateLimingPlastering.execute({
      sampleId,
      dataSample,
    });

    return res.json(limingPlastering);
  }
}
