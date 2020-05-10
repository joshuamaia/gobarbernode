import 'reflect-metadata';

import ListProviderDayAvalabilityService from './ListProviderDayAvalabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('ListProviderDayAvalability', () => {
  let listProviderDayAvalabilityService: ListProviderDayAvalabilityService;
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvalabilityService = new ListProviderDayAvalabilityService(
      fakeAppointmentsRepository
    );
  });

  it('show be able to list the hour avalability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const avalability = await listProviderDayAvalabilityService.execute({
      provider_id: 'user',
      month: 5,
      year: 2020,
      day: 20,
    });

    expect(avalability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 14, available: false },
        { hour: 15, available: true },
        { hour: 16, available: false },
        { hour: 17, available: true },
      ])
    );
  });
});
