import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, getHours } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvalabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayOnProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      {
        length: 10,
      },
      (_, index) => index + hourStart
    );

    const avalability = eachHourArray.map(hour => {
      const hasAppointmentsInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      );

      return {
        hour,
        available: !hasAppointmentsInHour,
      };
    });

    return avalability;
  }
}
