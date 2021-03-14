import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SamplesController from '../controllers/SamplesController';
import FilterSampleController from '../controllers/FilterSampleController';

const calculationRouter = Router();
const samplesController = new SamplesController();
const filterSampleController = new FilterSampleController();

calculationRouter.get('/id/:sampleId', filterSampleController.showPublic);

calculationRouter.use(ensureAuthenticated);

calculationRouter.get('/all', filterSampleController.indexAll);
calculationRouter.get('/sort/:sortId', filterSampleController.show);
calculationRouter.get('/ph/', filterSampleController.IndexPh);
calculationRouter.get('/nameUser/', filterSampleController.IndexNameUser);
calculationRouter.get('/chart', filterSampleController.indexChart);
calculationRouter.get('/count', filterSampleController.indexCount);
calculationRouter.get('/limit/:limitNumber', filterSampleController.indexLimit);

calculationRouter.delete('/:sampleId', samplesController.delete);
calculationRouter.post('/', samplesController.create);
calculationRouter.get('/:sampleId', samplesController.show);
calculationRouter.get('/', samplesController.index);
calculationRouter.put('/:sampleId', samplesController.update);

export default calculationRouter;
