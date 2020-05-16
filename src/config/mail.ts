interface IMailConfig {
  driver: 'ethereal';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'equipe@gobarber.com.br',
      name: 'Equipe Go Barber',
    },
  },
} as IMailConfig;
