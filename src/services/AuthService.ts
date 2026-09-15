import { UserRepository } from '../repositories/UserRepository';
import { LoginDTO } from '../utils/user.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env';
import { UnauthorizedError } from '../errors/AppError';

export class AuthService {
  async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await UserRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedError('E-mail ou senha incorretos.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError('E-mail ou senha incorretos.');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}