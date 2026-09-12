import { UserRepository } from '../repositories/UserRepository';
import { LoginDTO } from '../utils/user.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await UserRepository.findOneBy({ email });
    if (!user) {
      throw new Error('E-mail ou senha incorretos.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('E-mail ou senha incorretos.');
    }

    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const token = jwt.sign(
      { id: user.id, role: user.role },
      secret,
      { expiresIn: '1d' }
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