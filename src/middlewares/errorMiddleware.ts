import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[Erro]: ${err.message}`);

  
  if (err.message === 'E-mail já cadastrado.') {
    return res.status(409).json({ error: err.message });
  }

  
  if (err.message === 'E-mail ou senha incorretos.') {
    return res.status(401).json({ error: err.message });
  }

  
  return res.status(400).json({ error: err.message || 'Erro interno no servidor' });
}