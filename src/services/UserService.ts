import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDTO, UserResponseDTO } from '../utils/user.dto';
import bcrypt from 'bcrypt';
import { ConflictError, NotFoundError, BadRequestError } from '../errors/AppError';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class UserService {
  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new BadRequestError('Os campos name, email e password são obrigatórios.');
    }

    if (!EMAIL_REGEX.test(email)) {
      throw new BadRequestError('Formato de e-mail inválido.');
    }

    if (password.length < 6) {
      throw new BadRequestError('A senha deve ter no mínimo 6 caracteres.');
    }

    const userExists = await UserRepository.findOneBy({ email });
    if (userExists) {
      throw new ConflictError('E-mail já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = UserRepository.create({
      name,
      email,
      password: hashedPassword,
      role: 'ATTENDANT',
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

  async getById(id: string): Promise<UserResponseDTO> {
    const user = await UserRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}