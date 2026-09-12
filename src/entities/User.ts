import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users') // Nome da tabela no banco de dados
export class User {
  @PrimaryGeneratedColumn('uuid') // Gera um ID único universal (string)
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100, unique: true }) // unique: true impede e-mails repetidos
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 50, default: 'ATTENDANT' }) // Perfil de acesso padrão
  role!: string;

  @CreateDateColumn({ name: 'created_at' }) // Salva automaticamente a data/hora de criação
  createdAt!: Date;
}