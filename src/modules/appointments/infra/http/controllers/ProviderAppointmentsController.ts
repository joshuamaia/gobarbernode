import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderDayAvalabilityService from '@modules/appointments/services/ListProviderDayAvalabilityService';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { month, year, day } = request.body;
    const listProviderAppointmentsService = container.resolve(
      ListProviderAppointmentsService
    );

    const appointments = await listProviderAppointmentsService.execute({
      provider_id,
      month,
      year,
      day,
    });

    return response.json(appointments);
  }
}
