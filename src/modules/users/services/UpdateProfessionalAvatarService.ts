import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IProfessionalRepository from '../repositories/IProfessionalRepository';

import Professional from '../infra/typeorm/entities/Professional';

interface IRequest {
  professionalId: string;
  avatarFilename: string;
}

@injectable()
class ShowProfessionalService {
  constructor(
    @inject('ProfessionalRepository')
    private professionalRepository: IProfessionalRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    professionalId,
    avatarFilename,
  }: IRequest): Promise<Professional> {
    const professional = await this.professionalRepository.findById(
      professionalId,
    );

    if (!professional) {
      throw new AppError('Professional does not found');
    }

    if (professional.photo) {
      await this.storageProvider.deleteFile(professional.photo);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    professional.photo = filename;

    await this.professionalRepository.save(professional);

    return professional;
  }
}

export default ShowProfessionalService;
