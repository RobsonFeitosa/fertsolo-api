import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ProfessionalController from '../controllers/ProfessionalController';
import ProfessionalAvatarController from '../controllers/ProfessionalAvatarController';
import ProfessionalFilterController from '../controllers/ProfessionalFilterController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const professionalRouter = Router();

const professionalController = new ProfessionalController();
const professionalAvatarController = new ProfessionalAvatarController();
const professionalFilterController = new ProfessionalFilterController();

const upload = multer(uploadConfig.multer);

professionalRouter.use(ensureAuthenticated);

professionalRouter.get('/', professionalController.index);
professionalRouter.post('/', professionalController.create);
professionalRouter.get('/ofuser', professionalController.show);
professionalRouter.get(
  '/sort/:sortId',
  professionalFilterController.showIdSort,
);
professionalRouter.get(
  '/id/:professionalId',
  professionalFilterController.showId,
);
professionalRouter.get('/filter', professionalFilterController.IndexFilter);
professionalRouter.get('/count', professionalFilterController.IndexScore);
professionalRouter.get(
  '/crea/:creaName',
  professionalFilterController.showCrea,
);
professionalRouter.put('/', professionalController.update);
professionalRouter.delete('/:professionalId', professionalController.delete);

professionalRouter.patch(
  '/photo/:professionalId',
  upload.single('photo'),
  professionalAvatarController.update,
);
export default professionalRouter;
