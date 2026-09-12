<<<<<<< HEAD
# medclinic-api-
=======
# 🏥 MedClinic API - Autenticação e Autorização

## 📖 Descrição e Escopo

A **MedClinic API** é um sistema de gerenciamento para uma clínica médica.

Esta primeira etapa do projeto contempla a construção da arquitetura base da aplicação e a implementação dos módulos de:

- 🔐 Autenticação com JWT (JSON Web Token)
- 👥 Autorização com RBAC (Role-Based Access Control)

As entidades de domínio como **Especialidades**, **Médicos**, **Pacientes** e **Consultas** serão desenvolvidas em etapas futuras sobre esta estrutura.

---

## 🚀 Tecnologias Utilizadas

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

## ⚙️ Requisitos para Execução

Antes de iniciar o projeto, certifique-se de possuir:

- Node.js v16 ou superior
- npm
- PostgreSQL configurado
- Git instalado

---

## 🔐 Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

DATABASE_URL=postgres://usuario:senha@host:porta/banco

JWT_SECRET=sua_chave_secreta_aqui
```

---

## 🛠️ Instalação

### 1. Clonar o repositório

```bash
git clone <link-do-repositorio>
```

### 2. Acessar a pasta

```bash
cd medclinic-api
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Executar em modo desenvolvimento

```bash
npm run dev
```

---

## 🏗️ Arquitetura do Projeto

O projeto segue o padrão **MVC (Model-View-Controller)** com separação em camadas.

```text
src/
│
├── routes/
├── middlewares/
├── controllers/
├── services/
├── repositories/
├── entities/
├── database/
└── utils/
```

### 📂 Estrutura das Pastas

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

## 🔒 Fluxo de Segurança

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

## 📌 Funcionalidades Implementadas

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

## 📄 Licença

Projeto desenvolvido por Willian Piccinin para fins acadêmicos e de estudo.
>>>>>>> 9ac1e82cf3b155f7ba87dc3f62ce1aba2f1103b9
