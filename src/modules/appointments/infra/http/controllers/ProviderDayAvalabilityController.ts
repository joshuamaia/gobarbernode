import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderDayAvalabilityService from '@modules/appointments/services/ListProviderDayAvalabilityService';

export default class ProviderDayAvalabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.query;
    const listProviderDayAvalabilityService = container.resolve(
      ListProviderDayAvalabilityService
    );

    const avalability = await listProviderDayAvalabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return response.json(avalability);
  }
}
