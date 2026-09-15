import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDTO, UserResponseDTO } from '../utils/user.dto';
import bcrypt from 'bcrypt';

export class UserService {
  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    const { name, email, password } = data;

    const userExists = await UserRepository.findOneBy({ email });
    if (userExists) {
      throw new Error('E-mail já cadastrado.');
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
      throw new Error('Usuário não encontrado.');
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