-- Script para criação da tabela de usuários (TypeORM gerencia isso automaticamente, 
-- mas este arquivo atende à exigência de documentação da estrutura do banco).

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    role VARCHAR NOT NULL DEFAULT 'ATTENDANT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);