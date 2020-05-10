import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);
const appointmentsController = new ProvidersController();

providersRouter.get('/', appointmentsController.index);

export default providersRouter;
