import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvalabilityController from '../controllers/ProviderMonthAvalabilityController';
import ProviderDayAvalabilityController from '../controllers/ProviderDayAvalabilityController';

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);
const appointmentsController = new ProvidersController();
const providerMonthAvalabilityController = new ProviderMonthAvalabilityController();
const providerDayAvalabilityController = new ProviderDayAvalabilityController();

providersRouter.get('/', appointmentsController.index);
providersRouter.get(
  '/:provider_id/month-avalability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvalabilityController.index
);
providersRouter.get(
  '/:provider_id/day-avalability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvalabilityController.index
);

export default providersRouter;
