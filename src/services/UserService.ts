import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDTO, UserResponseDTO } from '../utils/user.dto';
import bcrypt from 'bcrypt';

export class UserService {
  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    const { name, email, password, role } = data;

    // 1. Verifica se o e-mail já existe no banco
    const userExists = await UserRepository.findOneBy({ email });
    if (userExists) {
      throw new Error('E-mail já cadastrado.');
    }

    // 2. Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Cria a entidade e salva no banco
    const newUser = UserRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'ATTENDANT',
    });
    await UserRepository.save(newUser);

    // 4. Retorna os dados usando o DTO de resposta (sem a senha!)
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };
  }
}