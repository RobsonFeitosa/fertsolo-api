import { Router } from 'express';

import CreditCardController from '../controllers/CreditCardController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const cardRouter = Router();
const creditCardController = new CreditCardController();

cardRouter.use(ensureAuthenticated);

cardRouter.post('/', creditCardController.create);
cardRouter.get('/', creditCardController.index);
cardRouter.get('/:cardId', creditCardController.show);
cardRouter.delete('/:cardId', creditCardController.delete);

export default cardRouter;
