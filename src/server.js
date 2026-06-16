import 'dotenv/config';// importa as variáveis do arquivo .env
import express from 'express';// importa o express
import cors from 'cors';// permite comunicação entre frontend e backend
import routes from './routes/routes.js';// importa as rotas do projeto
import path from 'path';// biblioteca para trabalhar com caminhos
import { fileURLToPath } from 'url';// converte URL para caminho de arquivo

// pega o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);

// pega o diretório atual
const __dirname = path.dirname(__filename);

// define a porta do servidor
const PORT = process.env.SERVER_PORT || 3000;

// cria a aplicação express
const app = express();

// habilita o cors
app.use(cors());

// permite receber json
app.use(express.json());

// libera acesso à pasta uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// usa as rotas do projeto
app.use('/', routes);

// inicia o servidor
app.listen(PORT, ()=> {

    console.log(
        `Servidor rodando em: http://localhost:${PORT}`
    );
});