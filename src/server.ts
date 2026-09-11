import 'reflect-metadata'; // Importação obrigatória do TypeORM, deve ser a primeira linha
import express, { Request, Response } from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'MedClinic API está rodando!' });
});

const PORT = process.env.PORT || 3000;

// Inicializa o banco de dados e só depois sobe o servidor
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Banco de dados conectado com sucesso!');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
  });