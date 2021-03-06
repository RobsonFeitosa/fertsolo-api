import { Router } from 'express';

import TransactionsControllers from '../controllers/TransactionsControllers';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const transactionsRouter = Router();
const transactionsControllers = new TransactionsControllers();

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.post('/', transactionsControllers.create);
transactionsRouter.get('/', transactionsControllers.index);
transactionsRouter.get('/count', transactionsControllers.indexCount);

export default transactionsRouter;
