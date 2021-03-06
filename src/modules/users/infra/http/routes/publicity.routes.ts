import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import PublicityController from '../controllers/PublicityController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const publicityRouter = Router();
const publicityController = new PublicityController();

const upload = multer(uploadConfig.multer);

publicityRouter.get(
  '/location/:locationName',
  publicityController.showFilterLocation,
);

publicityRouter.use(ensureAuthenticated);
publicityRouter.get('/', publicityController.index);
publicityRouter.post('/', publicityController.create);
publicityRouter.get('/:pub_id', publicityController.show);
publicityRouter.put('/location/:locationName', publicityController.update);

publicityRouter.patch(
  '/image/location/:locationName',
  upload.single('pub'),
  publicityController.updateImage,
);

publicityRouter.delete('/:pub_id', publicityController.delete);

export default publicityRouter;
