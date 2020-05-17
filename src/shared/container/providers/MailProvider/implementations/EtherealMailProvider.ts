import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';
import { injectable, inject } from 'tsyringe';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'lilla.shanahan@ethereal.email',
        pass: 'estc8kS3qVqAj5D7te',
      },
    });

    this.client = transporter;
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const mensage = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Go Barber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: 'Recuperação de senha',
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', mensage.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mensage));
  }
}
