import { connection } from "../configs/Database.js";

// objeto responsável pelas funções da tabela categorias
const categoriaRepository = {

    //Função criar uma nova categoria
    criar: async(categoria)=>{

        //Comando sql para inserir categoria
        const sql= 'INSERT INTO categorias (Nome, Descricao) VALUES(?,?);';

        //Valores que serão inseridos
        const values= [categoria.nome, categoria.descricao];

        //Executa o insert(criar) no banco
        const[rows] = await connection.execute(sql, values);

        return rows;
    },

    //Função editar uma categoria existente
    editar: async(categoria)=>{

        //Comando sql para atualizar categoria
        const sql= 'UPDATE categorias SET Nome=?, Descricao=? WHERE Id = ?;';

        //Valores usados no update
        const values= [categoria.nome, categoria.descricao, categoria.id];

        //Executa o update(esitar)
        const[rows] = await connection.execute(sql, values);

        return rows;
    },

    //Função deletar uma categoria pelo id
    deletar: async(id)=>{

        //Comando sql para deletar
        const sql= 'DELETE FROM categorias WHERE Id = ?;';

        //Id da categoria
        const values= [id];

        //Executa o delete(deletar)
        const[rows] = await connection.execute(sql, values);

        return rows;
    },

    //Função buscar uma categoria pelo id
    buscarPorId: async () => {

        //Comando sql para buscar categoria
        const sql = 'SELECT * FROM categorias WHERE id = ?;';

        //Executa a busca
        const [rows] = await connection.execute(sql, [id]);

        //Retorna apenas o primeiro resultado
        return rows[0];
    },

    //Função selecionar todas as categorias
    selecionar: async()=>{

        //Comando sql para listar categorias
        const sql= 'SELECT * FROM categorias;';

        //Executar o select(selecionar)
        const[rows] = await connection.execute(sql);

        return rows;
    }
}

export default categoriaRepository;