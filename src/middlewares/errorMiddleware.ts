import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[Erro]: ${err.message}`);

  // Se o erro tiver a mensagem de "E-mail já cadastrado", retornamos 409 Conflict
  if (err.message === 'E-mail já cadastrado.') {
    return res.status(409).json({ error: err.message });
  }

  // Se for erro de login (email ou senha incorretos), retornamos 401 Unauthorized
  if (err.message === 'E-mail ou senha incorretos.') {
    return res.status(401).json({ error: err.message });
  }

  // Para outros erros genéricos de regra de negócio (Bad Request)
  return res.status(400).json({ error: err.message || 'Erro interno no servidor' });
}