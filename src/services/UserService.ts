import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDTO, LoginDTO, UserResponseDTO } from '../utils/user.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
  // 1. Método para cadastrar usuário
  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    const { name, email, password, role } = data;

    const userExists = await UserRepository.findOneBy({ email });
    if (userExists) {
      throw new Error('E-mail já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = UserRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'ATTENDANT',
    });
    await UserRepository.save(newUser);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };
  }

  // 2. Método para realizar o Login e gerar o Token JWT
  async login(data: LoginDTO) {
    const { email, password } = data;

    // Busca o usuário no banco
    const user = await UserRepository.findOneBy({ email });
    if (!user) {
      throw new Error('E-mail ou senha incorretos.');
    }

    // Compara a senha informada com o hash salvo no banco
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('E-mail ou senha incorretos.');
    }

    // Gera o token assinado com a chave do .env
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