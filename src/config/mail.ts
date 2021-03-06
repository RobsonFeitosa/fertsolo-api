interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'gator';

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
      email: 'contato@fertsolo.com.br',
      name: 'Diony',
    },
  },
} as IMailConfig;
