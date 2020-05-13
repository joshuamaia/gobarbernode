import 'reflect-metadata';

import ListProviderDayAvalabilityService from './ListProviderDayAvalabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

describe('ListProviderAppointments', () => {
  let listProviderAppointmentsService: ListProviderAppointmentsService;
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository
    );
  });

  it('show be able to list the appointments on a specific day', async () => {
    const a1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const a2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      month: 5,
      year: 2020,
      day: 20,
    });

    expect(appointments).toEqual(expect.arrayContaining([a1, a2]));
  });
});
