#  MedClinic API - Autenticação e Autorização

##  Descrição e Escopo

A **MedClinic API** é um sistema de gerenciamento para uma clínica médica.

Esta é a **etapa inicial** (base de autenticação e autorização) da MedClinic API, um sistema para gerenciamento de clínica médica. As funcionalidades de domínio (especialidades, médicos, pacientes e consultas) não fazem parte desta entrega e serão implementadas futuramente.

---

##  Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| Node.js | Ambiente de execução JavaScript |
| TypeScript | Tipagem estática |
| Express.js | Framework web |
| PostgreSQL | Banco de dados relacional |
| Aiven | Hospedagem do banco em nuvem |
| TypeORM | ORM para acesso ao banco |
| bcrypt | Hash de senhas |
| jsonwebtoken | Geração e validação de JWT |

---

##  Requisitos para Execução

Antes de iniciar o projeto, certifique-se de possuir:

- Node.js v16 ou superior
- npm
- PostgreSQL configurado
- Git instalado

---

### 1. Clonar o repositório e instale as dependências

```bash
git clone https://github.com/Picci1522/medclinic-api.git
cd medclinic-api
npm install
```
### 2.Copie o arquivo de exemplo de variáveis de ambiente e preencha com suas credenciais:

```bash
cp .env.example .env
```
 Edite o `.env` com os dados do seu ambiente local (host, porta, usuário e senha do PostgreSQL, nome do banco, segredo JWT e tempo de expiração do token).

## 3.Configuração do banco de dados

1. Crie o banco de dados no PostgreSQL:

```bash
psql -U postgres -c "CREATE DATABASE medclinic;"
```

1. Execute as migrations para criar as tabelas:

```bash
npm run migration:run
```

Isso cria a extensão `uuid-ossp`, a tabela `users` e a tabela de controle `migrations`.


### 4. Executar em modo desenvolvimento

```bash
npm run dev
```

---

##  Arquitetura do Projeto

O projeto segue uma arquitetura **MVC em camadas**, preparada para receber os módulos de domínio da clínica em uma etapa futura:
Cliente HTTP → Route → Middleware (Auth/RBAC) → Controller → Service → Repository (TypeORM) → PostgreSQL

#### `src/routes`
Responsável pela definição das rotas e endpoints da API.

#### `src/middlewares`
Contém:

- Autenticação JWT
- Autorização RBAC
- Tratamento global de erros

#### `src/controllers`
Recebem as requisições HTTP e retornam respostas JSON.

#### `src/services`
Implementam regras de negócio e validações.

#### `src/repositories`
Camada de acesso ao banco de dados utilizando TypeORM.

#### `src/entities`
Mapeamento das entidades para tabelas do PostgreSQL.

Exemplo:

- User

#### `src/database`
Configuração do DataSource e conexão com PostgreSQL.

#### `src/utils`
Funções utilitárias, DTOs e tipagens auxiliares.

---
## Perfis de Acesso (RBAC)
O sistema possui controle de acesso baseado em perfis (Role-Based Access Control):
- **ADMIN:** Acesso completo a todas as funcionalidades da API.
- **ATENDENTE:** Acesso operacional, com permissões restritas. (Tentativas de acesso a rotas de administrador retornarão Erro HTTP 403 - Forbidden).

## Documentação dos Endpoints

| Método | Rota | Descrição | Autenticação | Status Esperados |
|---|---|---|---|---|
| `POST` | `/auth/register` | Cadastro de novo usuário | Não | 201, 400, 409 |
| `POST` | `/auth/login` | Login e emissão de JWT | Não | 200, 400, 401 |
| `GET` | `/users/me` | Retorna dados do usuário autenticado | Sim (Qualquer) | 200, 401, 404 |
| `GET` | `/admin/ping` | Rota de teste para administradores | Sim (Admin) | 200, 401, 403 |

### Exemplos de Requisição (Payload)

**POST `/auth/register`**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha_segura_123",
  "role": "ATENDENTE"
}
```

**POST `/auth/login`**
```json
{
  "email": "joao@email.com",
  "senha": "senha_segura_123"
}
```
*Exemplo de Resposta (200 OK):*
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
##  Fluxo de Segurança

```text
Login
  ↓
Validação das credenciais
  ↓
Geração do JWT
  ↓
Envio do Token ao Cliente
  ↓
Requisições Autenticadas
  ↓
Middleware JWT
  ↓
Middleware RBAC
  ↓
Acesso autorizado
```

---

##  Funcionalidades Implementadas

- Cadastro de usuários
- Hash seguro de senhas com BCrypt
- Login com JWT
- Middleware de autenticação
- Middleware de autorização RBAC
- Proteção de rotas
- Estrutura MVC
- Integração com PostgreSQL
- Integração com TypeORM

---

##  Licença

Projeto desenvolvido por Willian Piccinin para fins acadêmicos e de estudo.

