import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IPublicityRepository from '../repositories/IPublicityRepository';

import Publicity from '../infra/typeorm/entities/Publicity';

interface IRequest {
  locationName: string;
  imageFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('PublicityRepository')
    private publicityRepository: IPublicityRepository,
  ) {}

  public async execute({
    locationName,
    imageFilename,
  }: IRequest): Promise<Publicity> {
    const pub = await this.publicityRepository.findByLocation(locationName);

    if (!pub)
      throw new AppError('Only authenticated publicity can change image.', 401);

    if (pub.image) {
      await this.storageProvider.deleteFile(pub.image);
    }

    const filename = await this.storageProvider.saveFile(imageFilename);

    pub.image = filename;

    await this.publicityRepository.save(pub);

    return pub;
  }
}

export default UpdateUserAvatarService;
