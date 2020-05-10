import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthOnProviderDTO from '../dtos/IFindAllInMonthOnProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthOnProvider(
    data: IFindAllInMonthOnProviderDTO
  ): Promise<Appointment[]>;
}
