# MedClinic API - Autenticação e Autorização

## Descrição e Escopo

A **MedClinic API** é um sistema de gerenciamento para uma clínica médica.

Esta é a **etapa inicial** (base de autenticação e autorização) da MedClinic API, um sistema para gerenciamento de clínica médica. As funcionalidades de domínio (especialidades, médicos, pacientes e consultas) não fazem parte desta entrega e serão implementadas futuramente.

---

## Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| Node.js | Ambiente de execução JavaScript |
| TypeScript | Tipagem estática |
| Express.js | Framework web |
| PostgreSQL | Banco de dados relacional |
| Aiven | Hospedagem do banco em nuvem |
| TypeORM | ORM para acesso ao banco (com migrations) |
| bcrypt | Hash de senhas |
| jsonwebtoken | Geração e validação de JWT |

---

## Requisitos para Execução

Antes de iniciar o projeto, certifique-se de possuir:

- Node.js v16 ou superior
- npm
- PostgreSQL configurado (local ou em nuvem, ex: Aiven)
- Git instalado

---

### 1. Clonar o repositório e instalar as dependências

```bash
git clone https://github.com/Picci1522/medclinic-api.git
cd medclinic-api
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env
```

Edite o `.env` com os dados do seu ambiente (host, porta, usuário e senha do PostgreSQL, nome do banco, `JWT_SECRET` e `JWT_EXPIRES_IN`).

> ⚠️ **Importante:** `JWT_SECRET` é obrigatório. A aplicação **não sobe** sem essa variável definida (não existe valor padrão inseguro).

### 3. Configurar o banco de dados

Se o banco ainda não existir, crie-o:

```bash
psql -U postgres -c "CREATE DATABASE medclinic;"
```

Execute as migrations para criar as tabelas:

```bash
npm run migration:run
```

Isso cria a tabela `users` e a tabela de controle `migrations`.

### 4. Executar em modo desenvolvimento

```bash
npm run dev
```

### 5. Build e execução em produção

```bash
npm run build
npm start
```

---

## Arquitetura do Projeto

O projeto segue uma arquitetura **MVC em camadas**, preparada para receber os módulos de domínio da clínica em uma etapa futura:

Cliente HTTP → Route → Middleware (Auth/RBAC) → Controller → Service → Repository (TypeORM) → PostgreSQL


#### `src/routes`
Definição das rotas e endpoints da API.

#### `src/middlewares`
Contém:
- Autenticação JWT
- Autorização RBAC
- Tratamento global de erros

#### `src/controllers`
Recebem as requisições HTTP e retornam respostas JSON.

#### `src/services`
Implementam regras de negócio, validações e mapeamento para DTOs.

#### `src/repositories`
Camada de acesso ao banco de dados utilizando TypeORM.

#### `src/entities`
Mapeamento das entidades para tabelas do PostgreSQL (`User`).

#### `src/database`
Configuração do DataSource, conexão com PostgreSQL e migrations.

#### `src/errors`
Classes de erro customizadas (`AppError` e subclasses), usadas pelo middleware central de tratamento de erros para retornar o status HTTP correto.

#### `src/config`
Configuração e validação de variáveis de ambiente (ex: `JWT_SECRET`).

#### `src/utils`
DTOs e tipagens auxiliares.

---

## Perfis de Acesso (RBAC)

O sistema possui controle de acesso baseado em perfis (Role-Based Access Control). Os valores gravados no banco são em inglês:

- **`ADMIN`** — Acesso completo a todas as funcionalidades da API.
- **`ATTENDANT`** (Atendente) — Acesso operacional, com permissões restritas. Tentativas de acesso a rotas de administrador retornam `403 Forbidden`.

> 🔒 **Nota de segurança:** por padrão, **todo** novo usuário criado via `POST /auth/register` recebe o perfil `ATTENDANT`, independente do que for enviado no corpo da requisição — o campo `role` é ignorado nesse endpoint, para impedir que qualquer pessoa se autopromova a administrador. Veja abaixo como criar um usuário `ADMIN` para testes.

### Como criar um usuário ADMIN (necessário para testar o RBAC)

Não existe um endpoint público para criar administradores nesta etapa do projeto (por segurança). Para testar as rotas restritas:

1. Cadastre um usuário normal via `POST /auth/register`.
2. Promova esse usuário a `ADMIN` executando diretamente no banco de dados:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'seu-email-de-teste@exemplo.com';
```

---

## Documentação dos Endpoints

| Método | Rota | Descrição | Autenticação | Status Esperados |
|---|---|---|---|---|
| `POST` | `/auth/register` | Cadastro de novo usuário (sempre criado como `ATTENDANT`) | Não | 201, 400, 409 |
| `POST` | `/auth/login` | Login e emissão de JWT | Não | 200, 400, 401 |
| `GET` | `/users/me` | Retorna dados do usuário autenticado | Sim (Qualquer) | 200, 401, 404 |
| `GET` | `/admin/ping` | Rota de teste para administradores | Sim (Admin) | 200, 401, 403 |

### Exemplos de Requisição (Payload)

**POST `/auth/register`**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha_segura_123"
}
```

Validações aplicadas:
- `name`, `email` e `password` são obrigatórios
- `email` precisa ter formato válido
- `password` precisa ter no mínimo 6 caracteres
- `email` não pode já estar cadastrado

*Exemplo de Resposta (201 Created):*
```json
{
  "id": "d1eec4fa-16cc-4278-bbd9-55c02d0beaa0",
  "name": "João Silva",
  "email": "joao@email.com",
  "role": "ATTENDANT",
  "createdAt": "2026-09-16T14:28:34.891Z"
}
```

**POST `/auth/login`**
```json
{
  "email": "joao@email.com",
  "password": "senha_segura_123"
}
```

*Exemplo de Resposta (200 OK):*
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "d1eec4fa-16cc-4278-bbd9-55c02d0beaa0",
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "ATTENDANT"
  }
}
```

---

## Fluxo de Segurança

```text
Login
  ↓
Validação das credenciais
  ↓
Geração do JWT (payload: id + role, expiração definida)
  ↓
Envio do Token ao Cliente
  ↓
Requisições Autenticadas
  ↓
Middleware JWT (authMiddleware)
  ↓
Middleware RBAC (roleMiddleware)
  ↓
Acesso autorizado
```

Erros são tratados centralmente pelo `errorMiddleware`, que usa classes de erro (`AppError` e subclasses: `BadRequestError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ConflictError`) para retornar o status HTTP correto e uma mensagem clara em JSON.

---

## Funcionalidades Implementadas

- Cadastro de usuários com validação de campos obrigatórios e formato de e-mail
- Hash seguro de senhas com bcrypt
- Login com JWT (payload com id/role, expiração configurável via `.env`)
- Middleware de autenticação (token ausente, inválido ou expirado)
- Middleware de autorização RBAC
- Proteção contra escalonamento de privilégio no cadastro público
- Tratamento de erros padronizado por status code (400, 401, 403, 404, 409, 500)
- Handler de 404 estruturado em JSON para rotas inexistentes
- Estrutura MVC em camadas
- Migrations do TypeORM para versionamento do schema do banco
- Integração com PostgreSQL

---

## Licença

Projeto desenvolvido por Willian Piccinin para fins acadêmicos e de estudo.