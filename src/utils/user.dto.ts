// Define o formato esperado quando o usuário enviar dados para cadastro
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: string; 
}

// Define o formato esperado quando o usuário tentar fazer login
export interface LoginDTO {
  email: string;
  password: string;
}

// Define o formato seguro que devolveremos (NUNCA devolvemos a senha)
export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}