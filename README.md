<h1 align="center">
<img src="https://i.imgur.com/nwfkVsb.png" title="Clínica Pomarola" />
</h1>

<h3 align="center">
  Pomalabs Web
</h3>

<p align="center">
  <a href="#sobre o projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#iniciando">Iniciando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#funcionalidades">Funcionalidades</a>
</p>

## 👨🏻‍💻 Sobre o projeto

- <p style="color: red;">A PomaLabs teve como desafio desenvolver um sistema para possibilitar o cadastro de clientes, atendimentos e prontuários dos pacientes de um consultório.</p>

Para ver o **Front-end**, clique aqui: [PomaLabs front-end](https://github.com/jhsmiranda/desafio-afya-front-end)</br>

### 💻 Desenvolvedores
- [José Henrique da Silva Miranda](https://github.com/jhsmiranda)
- [Gustavo Lening Godoy de Oliveira](https://github.com/gustavolening)
- [Fábio Henrique Dutra Costa](https://github.com/fdutrac)
- [Filipe Galdino Dantas](https://github.com/flipdantas)

## 🚀 Tecnologias

Tecnologias que utilizamos para desenvolver esta API Rest:

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Express Validator](https://express-validator.github.io/)
- [Jest](https://jestjs.io/pt-BR/)
- [Axios](https://github.com/axios/axios)
- [Eslint](https://eslint.org/)
- [SuperTest](https://www.npmjs.com/package/supertest)

## 💻 Iniciando

- As instruções a seguir irão te guiar para que você crie uma cópia do projeto na sua máquina local.

### Pré-requisitos

- Configure um banco de dados [PostgreSQL](https://www.postgresql.org/) na sua máquina e crie um novo banco.

**Clone o projeto e acesse a pasta**

```bash
$ git clone https://github.com/fdutrac/desafio-afya-api/ && cd desafio-afya-api
```

**Siga as etapas abaixo**

Edite o arquivo "env_example" com as configurações do seu banco de dados:

```
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=seu_host
DB_PORT=sua_port
DB_NAME=nome_do_banco
JWT_SECRET=seu_segredo

```

```bash
# Instale as dependências
$ yarn

# Inicie o client
$ yarn start
```

Tudo pronto! Agora, basta acessar a aplicação, disponível em:
localhost:3000

Documentação dos endpoints disponível na rota:
localhost:3000/api-docs

Para acessar a API diretamente no seu browser, acesse https://clinica-pomarola-api.herokuapp.com/

## ⚙️ Funcionalidades
Funcionalidades que o sistema oferece:
- Cadastro e Login de Usuários
- Cadastro de Clientes e Especialistas
- Cadastro de Atendimentos e de Históricos de Prontuários
- Pesquisa
	- Busca de atendimentos por Status, Paciente, Especialista, Data de agendamento ou de atendimento
- Criação de Agendamentos
- Criptografia de senhas
- Sistema de autenticação de usuário
- Validação de requisições
- Mensagens de erro customizadas *user friendly*
- Documentação dos endpoints

## 📄 Licença

Este projeto está sob a licença de (PomaLabs).
