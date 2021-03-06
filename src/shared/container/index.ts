import { container } from 'tsyringe';

import '@modules/users/providers';
import '@modules/calculations/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IAddressRepository from '@modules/users/repositories/IAddressRepository';
import AddressRepository from '@modules/users/infra/typeorm/repositories/AddressRepository';

import ICreditCardRepository from '@modules/users/repositories/ICreditCardRepository';
import CreditCardRepository from '@modules/users/infra/typeorm/repositories/CreditCardRepository';

import IProfessionalRepository from '@modules/users/repositories/IProfessionalRepository';
import ProfessionalRepository from '@modules/users/infra/typeorm/repositories/ProfessionalRepository';

import IPublicityRepository from '@modules/users/repositories/IPublicityRepository';
import PublicityRepository from '@modules/users/infra/typeorm/repositories/PublicityRepository';

import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ILimingPlasteringRepository from '@modules/calculations/repositories/ILimingPlasteringRepository';
import LimingPlasteringRepository from '@modules/calculations/infra/typeorm/repositories/LimingPlasteringRepository';

import ISettingsRepository from '@modules/settings/repositories/ISettingsRepository';
import SettingsRepository from '@modules/settings/infra/typeorm/repositories/SettingsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);

container.registerSingleton<ICreditCardRepository>(
  'CreditCardRepository',
  CreditCardRepository,
);

container.registerSingleton<IProfessionalRepository>(
  'ProfessionalRepository',
  ProfessionalRepository,
);

container.registerSingleton<IPublicityRepository>(
  'PublicityRepository',
  PublicityRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ILimingPlasteringRepository>(
  'LimingPlasteringRepository',
  LimingPlasteringRepository,
);

container.registerSingleton<ISettingsRepository>(
  'SettingsRepository',
  SettingsRepository,
);
