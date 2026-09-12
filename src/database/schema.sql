<<<<<<< HEAD
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
=======
-- Script para criação da tabela de usuários (TypeORM gerencia isso automaticamente, 
-- mas este arquivo atende à exigência de documentação da estrutura do banco).

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
>>>>>>> 9ac1e82cf3b155f7ba87dc3f62ce1aba2f1103b9
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    role VARCHAR NOT NULL DEFAULT 'ATTENDANT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);