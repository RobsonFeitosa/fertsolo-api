import { Router } from 'express';

import samplesRouter from '@modules/calculations/infra/http/routes/samples.routes';

import transactionsRouter from '@modules/users/infra/http/routes/transactions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sesionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import creditCardRouter from '@modules/users/infra/http/routes/creditCard.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import professionalRouter from '@modules/users/infra/http/routes/professional.routes';
import addressRouter from '@modules/users/infra/http/routes/address.routes';
import publicityRouter from '@modules/users/infra/http/routes/publicity.routes';
import contactRouter from '@modules/users/infra/http/routes/contact.routes';
import accountRouter from '@modules/users/infra/http/routes/account.routes';

import settingsRouter from '@modules/settings/infra/http/routes/settings.routes';

const routes = Router();

routes.use('/actived', accountRouter);
routes.use('/sample', samplesRouter);
routes.use('/users', usersRouter);
routes.use('/publicity', publicityRouter);
routes.use('/contact', contactRouter);
routes.use('/professional', professionalRouter);
routes.use('/transactions', transactionsRouter);
routes.use('/sessions', sesionsRouter);
routes.use('/card', creditCardRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/address', addressRouter);
routes.use('/settings', settingsRouter);

export default routes;
