# gobarbernode

# Recuperação de senha

**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha.

**Requisitos Não Funcionais**

- Utilizar mail trap para testar emails em desenvolvimento;
- Utlizar o amazon SES para envio em produção;
- o envio de email deve acontecer em segundo plano.

**Regras de Negócio**

- o link enviado por email para resentar a senha experia em 2h;
- o usuário precisa confirmar a nova senha na recuperação.

# atualização do perfil

**Requisitos Funcionais**

- o usuário deve poder atuazar seu nome, email e senha

**Requisitos Não Funcionais**

**Regras de Negócio**

- o usuário não pode alterar seu email para um email já utilizado

- para atualizar sua senha, o usuário deve informar a senha antiga

- para atualizar a senha tem que haver confirmação

# painel do prestador

**Requisitos Funcionais**

- o usuário deve poder listar todos os seus agendamentos de um dia específico;
- o prestador deve receber uma notificação sempre que houver um novo agendamento;
- o prestador deve poder visualizar as notificações não lidas.

**Requisitos Não Funcionais**

- os agendamentos do prestador deve ser armazenado em cache;
- as notificações do prestador devem ser armazenadas no mongo DB;
- as notificações do prestador devem ser enviadas em tempo real com Socket.io.

**Regras de Negócio**

- a notificação deve ter um status de lida ou não lida para que o prestador possa controlar.

# agendamento de seviços

**Requisitos Funcionais**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;

- deve poder visualizar as datas de um mês com pelo menos um horário disponível de um prestador;

- o usuário deve poder listar horários disponíveis de um dia de um prestador;

- o usuário deve poder agendar o serviço com um prestador.

**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cash;

**Regras de Negócio**

- cada agendamento deve durar 1h;

- os agendamentos deve estar disponíveis de 8h até às 18h (primeiro 8h último 17h);

- o usuário não pode agendar em um horário ocupado;

- o usuário não pode agendar em um horário que já passou;

- o usuário não pode agendar serviço consigo mesmo.
