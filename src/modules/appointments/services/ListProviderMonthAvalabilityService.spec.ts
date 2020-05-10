import 'reflect-metadata';

import ListProviderMonthAvalabilityService from './ListProviderMonthAvalabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('ListProviderMonthAvalability', () => {
  let listProviderMonthAvalabilityService: ListProviderMonthAvalabilityService;
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvalabilityService = new ListProviderMonthAvalabilityService(
      fakeAppointmentsRepository
    );
  });

  it('show be able to list the month avalability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const avalability = await listProviderMonthAvalabilityService.execute({
      provider_id: 'user',
      month: 5,
      year: 2020,
    });

    expect(avalability).toEqual(
      expect.arrayContaining([
        { day: 19, avalability: true },
        { day: 20, avalability: false },
        { day: 21, avalability: false },
        { day: 22, avalability: true },
      ])
    );
  });
});
