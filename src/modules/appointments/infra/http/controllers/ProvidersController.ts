import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute({
      user_id,
    });

    return response.json(classToClass(providers));
  }
}
