import { Request, Response, NextFunction } from 'express';

export function roleMiddleware(rolesPermitidas: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).userRole;

    if (!userRole) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    if (!rolesPermitidas.includes(userRole)) {
      return res.status(403).json({ error: 'Acesso negado: perfil sem permissão' });
    }

    return next();
  };
}