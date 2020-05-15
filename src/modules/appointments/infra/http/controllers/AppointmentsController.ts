import { Request, Response } from 'express';
import { parseISO, format } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createAppointmentService = container.resolve(
      CreateAppointmentService
    );

    const user_id = request.user.id;

    const { provider_id, date } = request.body;

    // console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));

    // console.log('Date ', new Date(date));

    // const parsedDate = parseISO(date);
    const parsedDate = new Date(date);

    // console.log(parsedDate);

    const appointment = await createAppointmentService.execute({
      provider_id,
      user_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}
