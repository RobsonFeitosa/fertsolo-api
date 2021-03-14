import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '@modules/users/services/CreateAddressService';
import ShowAddressService from '@modules/users/services/ShowAddressService';
import UpdateAddressService from '@modules/users/services/UpdateAddressService';

export default class AddressController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const {
      zipcode,
      city,
      state,
      country,
      neighborhood,
      street,
      street_number,
    } = req.body;

    const createAddress = container.resolve(CreateAddressService);

    const address = await createAddress.execute({
      user_id,
      zipcode,
      city,
      state,
      country,
      neighborhood,
      street,
      street_number,
    });

    return res.json(address);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { addressId } = req.params;

    const showAddress = container.resolve(ShowAddressService);

    const address = await showAddress.execute(addressId);

    return res.json(address);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { addressId } = req.params;
    const {
      zipcode,
      city,
      state,
      country,
      neighborhood,
      street,
      street_number,
    } = req.body;

    const updateAddress = container.resolve(UpdateAddressService);

    const address = await updateAddress.execute({
      addressId,
      zipcode,
      city,
      state,
      country,
      neighborhood,
      street,
      streetNumber: street_number,
    });

    return res.json(address);
  }
}
