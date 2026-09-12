import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDTO, UserResponseDTO } from '../utils/user.dto';
import bcrypt from 'bcrypt';

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
}