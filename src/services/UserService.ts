import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDTO, UserResponseDTO } from '../utils/user.dto';
import bcrypt from 'bcrypt';
import { ConflictError, NotFoundError, BadRequestError } from '../errors/AppError';

export class UserService {
  private readonly repository = UserRepository;
  private readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly SALT_ROUNDS = 10;
  private readonly MIN_PASSWORD_LENGTH = 6;

  public async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    const { name, email, password } = data;

    this.validateUserData(name, email, password);

    const userExists = await this.repository.findOneBy({ email });
    if (userExists) {
      throw new ConflictError('E-mail já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    const newUser = this.repository.create({
      name,
      email,
      password: hashedPassword,
      role: 'ATTENDANT',
    });
    await this.repository.save(newUser);

    return this.toResponseDTO(newUser);
  }

  public async getById(id: string): Promise<UserResponseDTO> {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    return this.toResponseDTO(user);
  }

  private validateUserData(name: string, email: string, password: string): void {
    if (!name || !email || !password) {
      throw new BadRequestError('Os campos name, email e password são obrigatórios.');
    }

    if (!this.EMAIL_REGEX.test(email)) {
      throw new BadRequestError('Formato de e-mail inválido.');
    }

    if (password.length < this.MIN_PASSWORD_LENGTH) {
      throw new BadRequestError(
        `A senha deve ter no mínimo ${this.MIN_PASSWORD_LENGTH} caracteres.`
      );
    }
  }

  private toResponseDTO(user: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
  }): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}