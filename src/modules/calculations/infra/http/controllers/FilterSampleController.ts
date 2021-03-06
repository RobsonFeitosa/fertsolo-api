import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IndexAllLimingPlasteringService from '@modules/calculations/services/IndexAllLimingPlasteringService';
import ShowSortIdLimingPlasteringService from '@modules/calculations/services/ShowSortIdLimingPlasteringService';
import IndexOfUserLimingPlasteringService from '@modules/calculations/services/IndexOfUserLimingPlasteringService';
import IndexPhLimingPlasteringService from '@modules/calculations/services/IndexPhLimingPlasteringService';
import IndexChartsLimingPlasteringService from '@modules/calculations/services/IndexChartsLimingPlasteringService';
import IndexCountLimingPlasteringService from '@modules/calculations/services/IndexCountLimingPlasteringService';
import IndexLimitLimingPlasteringService from '@modules/calculations/services/IndexLimitLimingPlasteringService';

export default class CalculationsController {
  public async indexAll(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10 } = req.query;

    const indexSample = container.resolve(IndexAllLimingPlasteringService);

    const samples = await indexSample.execute({
      page: Number(page),
      limit: Number(limit),
    });

    return res.json(classToClass(samples));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { sortId } = req.params;

    const showSample = container.resolve(ShowSortIdLimingPlasteringService);

    const sample = await showSample.execute(sortId.toUpperCase());

    return res.json(classToClass(sample));
  }

  public async IndexPh(req: Request, res: Response): Promise<Response> {
    const {
      min = 0,
      max = 9999,
      page = 1,
      limit = 10,
      unity = 'cacl',
    } = req.query;

    const filter = container.resolve(IndexPhLimingPlasteringService);

    const samples = await filter.execute({
      min: Number(min),
      max: Number(max),
      page: Number(page),
      limit: Number(limit),
      unity: String(unity),
    });

    return res.json(classToClass(samples));
  }

  public async IndexNameUser(req: Request, res: Response): Promise<Response> {
    const { page = 1, limit = 10, nameUser } = req.query;

    const filter = container.resolve(IndexOfUserLimingPlasteringService);

    const samples = await filter.execute({
      page: Number(page),
      limit: Number(limit),
      nameUser: String(nameUser),
    });

    return res.json(classToClass(samples));
  }

  public async indexChart(req: Request, res: Response): Promise<Response> {
    const filter = container.resolve(IndexChartsLimingPlasteringService);

    const samples = await filter.execute();

    return res.json(samples);
  }

  public async indexCount(req: Request, res: Response): Promise<Response> {
    const count = container.resolve(IndexCountLimingPlasteringService);

    const samplesCount = await count.execute();

    return res.json(samplesCount);
  }

  public async indexLimit(req: Request, res: Response): Promise<Response> {
    const { limitNumber } = req.params;
    const limit = container.resolve(IndexLimitLimingPlasteringService);

    const samples = await limit.execute(limitNumber);

    return res.json(samples);
  }
}
