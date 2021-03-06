import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowSortIdProfessionalService from '@modules/users/services/ShowSortIdProfessionalService';
import ShowCreaNameProfessionalService from '@modules/users/services/ShowCreaNameProfessionalService';
import IndexFilterProfessionalService from '@modules/users/services/IndexFilterProfessionalService';
import ShowIdProfessionalService from '@modules/users/services/ShowIdProfessionalService';
import IndexCountProfessionalService from '@modules/users/services/IndexCountProfessionalService';

export default class ProfessionalController {
  public async showIdSort(req: Request, res: Response): Promise<Response> {
    const { sortId } = req.params;

    const showProfessional = container.resolve(ShowSortIdProfessionalService);

    const professional = await showProfessional.execute(sortId.toLowerCase());

    return res.json(classToClass(professional));
  }

  public async showCrea(req: Request, res: Response): Promise<Response> {
    const { creaName } = req.params;

    const showProfessional = container.resolve(ShowCreaNameProfessionalService);

    const professional = await showProfessional.execute(creaName);

    return res.json(classToClass(professional));
  }

  public async showId(req: Request, res: Response): Promise<Response> {
    const { professionalId } = req.params;

    const showProfessional = container.resolve(ShowIdProfessionalService);

    const professional = await showProfessional.execute(professionalId);

    return res.json(classToClass(professional));
  }

  public async IndexFilter(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 8, city = '', uf = '', name = '' } = req.query;

    const indexProfessionals = container.resolve(
      IndexFilterProfessionalService,
    );

    const professionals = await indexProfessionals.execute({
      page: Number(page),
      limit: Number(limit),
      city: String(city),
      uf: String(uf),
      name: String(name),
    });

    return res.json(classToClass(professionals));
  }

  public async IndexScore(req: Request, res: Response): Promise<Response> {
    const scoreProfessional = container.resolve(IndexCountProfessionalService);

    const score = await scoreProfessional.execute();

    return res.json(classToClass(score));
  }
}
