import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderMonthAvalabilityService from '@modules/appointments/services/ListProviderMonthAvalabilityService';

export default class ProviderMonthAvalabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;
    const listProviderMonthAvalabilityService = container.resolve(
      ListProviderMonthAvalabilityService
    );

    const avalability = await listProviderMonthAvalabilityService.execute({
      provider_id,
      month,
      year,
    });

    return response.json(avalability);
  }
}
