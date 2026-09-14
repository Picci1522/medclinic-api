import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users') 
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 50, default: 'ATTENDANT' }) 
  role!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}