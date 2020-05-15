import { ObjectID } from 'mongodb';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '../../infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();
    notification.recipient_id = recipient_id;

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    return notification;
  }
}

export default FakeNotificationsRepository;
