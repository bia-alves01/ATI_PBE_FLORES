import { Produtos } from "../models/Produtos.js";
import produtoRepository from "../repositories/produtoRepository.js";

// objeto responsável pelas funções dos produtos
const produtosController = {

    // cria um novo produto
    criar: async (req, res) => {

        try {

            // verifica se a imagem foi enviada
            if (!req.file) {

                return res.status(400).json({
                    message: 'Verifique se a imagem foi enviada'
                });
            }

            // pega os dados enviados no body
            const { nome, descricao, preco, qtdEstoque, idCategoria } = req.body;

            // monta o caminho da imagem
            const vinculoImagem = `/uploads/imagens/${req.file.filename}`;

            // cria um novo objeto produto
            const produto = Produtos.criar({
                nome,
                descricao,
                preco,
                vinculoImagem,
                qtdEstoque,
                idCategoria
            });

            // salva no banco
            const result = await produtoRepository.criar(produto);

            res.status(201).json({ result });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    // seleciona um ou todos os produtos
    selecionar: async (req, res) => {

        try {

            const id = req.params.id;

            let result;

            // verifica se foi enviado um id
            if (id) {

                result = await produtoRepository.selecionarPorId(id);

            } else {

                result = await produtoRepository.selecionarTodos();
            }

            return res.status(200).json({ result });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    // seleciona apenas o estoque do produto
    selecionarEstoque: async (req, res) => {

        try {

            const id = req.params.id;

            const result = await produtoRepository.selecionarEstoque(id);

            return res.status(200).json({ result });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    // edita um produto
    editar: async (req, res) => {

        try {

            const id = req.params.id;

            const {
                nome,
                descricao,
                preco,
                qtdEstoque,
                idCategoria,
                vinculoImagemAtual
            } = req.body;

            // mantém a imagem atual caso não envie outra
            let vinculoImagem = vinculoImagemAtual;

            // atualiza a imagem se enviar um novo arquivo
            if (req.file) {

                vinculoImagem = `/uploads/imagens/${req.file.filename}`;
            }

            const produto = {
                id,
                nome,
                descricao,
                preco,
                vinculoImagem,
                qtdEstoque,
                idCategoria
            };

            const result = await produtoRepository.editar(produto);

            return res.status(200).json({
                message: 'Produto atualizado com sucesso',
                result
            });

        } catch (error) {

            console.log(error);

            return res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    // deleta um produto
    deletar: async (req, res) => {

        try {

            const id = req.params.id;

            const result = await produtoRepository.deletar(id);

            return res.status(200).json({ result });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

}

export default produtosController;