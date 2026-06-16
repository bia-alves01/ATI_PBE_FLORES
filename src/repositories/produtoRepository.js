import { connection } from "../configs/Database.js";

// objeto responsável pelas funções da tabela produtos
const produtoRepository = {

    //Função criar um novo produto
    criar: async (produto) => {

        //Comando sql para inserir produto
        const sql = `
            INSERT INTO produtos
            (nome, descricao, preco, vinculoImagem, qtdEstoque, idCategoria)
            VALUES (?, ?, ?, ?, ?, ?);
        `;

        //Valores que serão inseridos
        const values = [
            produto.nome,
            produto.descricao,
            produto.preco,
            produto.vinculoImagem,
            produto.qtdEstoque,
            produto.idCategoria
        ];

        //Executa o insert no banco
        const [result] = await connection.execute(sql, values);

        return result;
    },

    //Função selecionr todos os produtos
    selecionarTodos: async () => {

        const sql = 'SELECT * FROM produtos;';

        const [rows] = await connection.execute(sql);

        return rows;
    },

    //Função buscar um produto pelo id
    selecionarPorId: async (idProduto) => {

        const sql = `
        SELECT *
        FROM produtos
        WHERE id = ?;
    `;

        const [rows] = await connection.execute(sql, [idProduto]);

        //Retorna apenas o primeiro resultado
        return rows[0];
    },

    //Função buscar apenas informações de estoque
    selecionarEstoque: async (idProduto) => {

        const sql = `
        SELECT id, nome, qtdEstoque
        FROM produtos
        WHERE id = ?;
    `;

        const [rows] = await connection.execute(sql, [idProduto]);

        return rows[0];
    },

    //Função editar um produto
    editar: async (produto) => {

        console.log(produto.nome,
            produto.descricao,
            produto.preco,
            produto.vinculoImagem,
            produto.qtdEstoque,
            produto.idCategoria)

        console.log(produto.id);

        const sql = `
        UPDATE produtos
        SET nome = ?, descricao = ?, preco = ?, vinculoImagem = ?,  idCategoria = ?, qtdEstoque = ? WHERE id = ?;`;

        const values = [
            produto.nome,
            produto.descricao,
            produto.preco,
            produto.vinculoImagem,
            produto.idCategoria,
            produto.qtdEstoque,
            produto.id
        ];

        const [result] = await connection.execute(sql, values);

        return result;
    },

    //Função deletar um produto pelo seu id
    deletar: async (idProduto) => {

        const sql = 'DELETE FROM produtos WHERE id = ?;';

        const [rows] = await connection.execute(sql, [idProduto]);

        return rows;
    }
};

export default produtoRepository;