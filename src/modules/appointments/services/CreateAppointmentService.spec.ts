import 'reflect-metadata';

import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let createAppointmentService: CreateAppointmentService;

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
  });

  it('show be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123',
      user_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('show not be able to create two appointment on the same time', async () => {
    const dateAppointment = new Date(2020, 4, 10, 11);

    const appointment = await createAppointmentService.execute({
      date: dateAppointment,
      provider_id: '123123',
      user_id: '123123',
    });

    await expect(
      createAppointmentService.execute({
        date: dateAppointment,
        provider_id: '123123',
        user_id: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
