import { Router } from 'express';

import AddressController from '../controllers/AddressController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const addressRouter = Router();
const addressController = new AddressController();

addressRouter.use(ensureAuthenticated);

addressRouter.post('/', addressController.create);
addressRouter.get('/', addressController.show);
addressRouter.put('/:addressId', addressController.update);

export default addressRouter;
