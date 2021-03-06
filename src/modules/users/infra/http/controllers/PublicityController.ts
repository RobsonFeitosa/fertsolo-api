import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePublicityService from '@modules/users/services/CreatePublicityService';
import ShowPublicityService from '@modules/users/services/ShowPublicityService';
import ShowLocationPublicityService from '@modules/users/services/ShowLocationPublicityService';
import IndexPublicityService from '@modules/users/services/IndexPublicityService';
import UpdatePublicityService from '@modules/users/services/UpdatePublicityService';
import UpdatePubiclityImageService from '@modules/users/services/UpdatePubiclityImageService';
import DeletePublicityService from '@modules/users/services/DeletePublicityService';

export default class AddressController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { link, details, display, location } = req.body;

    const createPublicity = container.resolve(CreatePublicityService);

    const publicity = await createPublicity.execute({
      user_id,
      link,
      details,
      display,
      location,
    });

    return res.json(classToClass(publicity));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { pub_id } = req.params;

    const showPublicity = container.resolve(ShowPublicityService);

    const publicity = await showPublicity.execute(pub_id);

    return res.json(classToClass(publicity));
  }

  public async showFilterLocation(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { locationName } = req.params;

    const showPublicity = container.resolve(ShowLocationPublicityService);

    const publicity = await showPublicity.execute(locationName);

    return res.json(classToClass(publicity));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexPublicity = container.resolve(IndexPublicityService);

    const publicity = await indexPublicity.execute();

    return response.json(classToClass(publicity));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { locationName } = req.params;

    const { link, details, display } = req.body;

    const updatePublicity = container.resolve(UpdatePublicityService);

    const publicity = await updatePublicity.execute({
      locationName,
      link,
      details,
      display,
    });

    return res.json(classToClass(publicity));
  }

  public async updateImage(req: Request, res: Response): Promise<Response> {
    const { locationName } = req.params;
    const updatePubiclityImage = container.resolve(UpdatePubiclityImageService);

    const publicity = await updatePubiclityImage.execute({
      locationName,
      imageFilename: req.file.filename,
    });

    return res.json(classToClass(publicity));
  }

  public async delete(req: Request, res: Response): Promise<any> {
    const { pub_id } = req.params;

    const deletePublicity = container.resolve(DeletePublicityService);

    await deletePublicity.execute(pub_id);

    return res.status(204).send();
  }
}
