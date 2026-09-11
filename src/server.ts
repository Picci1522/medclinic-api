import 'reflect-metadata'; 
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routes from './routes'; // <-- Importa as rotas

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes); // <-- Habilita as rotas na aplicação

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Banco de dados conectado com sucesso!');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.error('❌ Erro ao conectar:', error));