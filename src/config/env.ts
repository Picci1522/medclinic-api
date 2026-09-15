if (!process.env.JWT_SECRET) {
  throw new Error(
    'JWT_SECRET não definido. Configure a variável no arquivo .env antes de iniciar a aplicação.'
  );
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';