import { Categoria } from "../models/Categoria.js";
import categoriaRepository from "../repositories/categoriaRepository.js";
import { connection } from "../configs/Database.js";

// objeto responsável pelas funções relacionadas às categorias
const categoriaController = {

    // função para criar uma nova categoria
    criar: async (req, res) => {

        try {

            // pega os dados enviados no body da requisição
            const { nome, descricao } = req.body;

            // cria um objeto categoria usando a model
            const categoria = Categoria.criar({
                nome,
                descricao
            });

            // envia os dados para o repository salvar no banco
            const result = await categoriaRepository.criar(categoria);

            // retorna sucesso na criação
            res.status(201).json({ result });

        } catch (error) {

            // mostra o erro no terminal
            console.log(error);

            // retorna erro para o usuário
            res.status(500).json({
                message: 'ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    // função para editar uma categoria existente
    editar: async (req, res) => {

        try {

            // pega o id enviado na url
            const id = req.params.id;

            // pega os novos dados enviados
            const { nome, descricao } = req.body;

            // cria um objeto categoria com os novos dados
            const categoria = Categoria.alterar(
                { nome, descricao },
                id
            );

            // envia para o repository atualizar no banco
            const result = await categoriaRepository.editar(categoria);

            // retorna mensagem de sucesso
            res.status(200).json({
                message: "Categoria atualizada com sucesso",
                result
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    },

    // função para deletar uma categoria
    deletar: async (req, res) => {

        try {

            // pega o id enviado na url
            const id = req.params.id;

            // chama o repository para deletar
            const result = await categoriaRepository.deletar(id);

            // retorna o resultado
            res.status(200).json({ result });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    // função para listar todas as categorias
    selecionar: async (req, res) => {

        try {

            // busca todas as categorias no banco
            const result = await categoriaRepository.selecionar();

            // retorna os dados encontrados
            res.status(200).json({ result });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    // função para buscar uma categoria pelo id
    buscarPorId: async (req, res) => {

        try {

            // pega o id enviado na url
            const id = req.params.id;

            // query para buscar categoria pelo id
            const sql = "SELECT * FROM categorias WHERE id = ?";

            // executa a query no banco
            const [rows] = await connection.execute(sql, [id]);

            // verifica se encontrou alguma categoria
            if (rows.length === 0) {

                return res.status(404).json({
                    message: "Categoria não encontrada"
                });
            }

            // retorna a categoria encontrada
            res.status(200).json({
                result: rows[0]
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: "Ocorreu um erro no servidor",
                errorMessage: error.message
            });
        }
    }
};

export default categoriaController;