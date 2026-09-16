import { UserRepository } from '../repositories/UserRepository';
import { LoginDTO } from '../utils/user.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env';
import { UnauthorizedError } from '../errors/AppError';

export class AuthService {
  private readonly repository = UserRepository;

  public async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await this.repository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedError('E-mail ou senha incorretos.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError('E-mail ou senha incorretos.');
    }

    const token = this.generateToken(user.id, user.role);

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

  private generateToken(id: string, role: string): string {
    return jwt.sign(
      { id, role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
    );
  }
}