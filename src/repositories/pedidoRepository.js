import { connection } from "../configs/Database.js";

const pedidoRepository = {

    criar: async (pedido, itens) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const sqlPedido = `INSERT INTO pedidos (idCliente, SubTotal, Status) VALUES (?, ?, ?);`;

            const valuesPedido = [
                pedido.idCliente,
                pedido.subTotal,
                pedido.status
            ];

            const [resultPedido] = await conn.execute(sqlPedido, valuesPedido);

            for (const item of itens) {

                const sqlItem = `INSERT INTO itens_pedidos (idPedido, idProduto, Quantidade, ValorItem) VALUES (?, ?, ?, ?);`;

                const valuesItem = [
                    resultPedido.insertId,
                    item.idProduto,
                    item.quantidade,
                    item.valorItem
                ];

                await conn.execute(sqlItem, valuesItem);
            }

            //Comando se salvar tudo 
            await conn.commit();

            //Returna o resultado do pedido criado
            return resultPedido;

        } catch (error) {

            //Caso de algum erro não será salvo 
            await conn.rollback();
            throw error;//Repassa o erro para quem chamou a função

        } finally {//Liberá a conecção 

            conn.release();

        }
    },

    atualizarStatus: async (idPedido, novoStatus) => {

        const sql = `UPDATE pedidos SET Status = ? WHERE Id = ?;`;

        const [result] = await connection.execute(sql, [
            novoStatus,
            idPedido
        ]);

        return result;
    },

    selecionarTodos: async () => {

        const sql = `
            SELECT 
                p.Id AS idPedido,
                p.idCliente,
                p.SubTotal,
                p.Status,
                ip.Id AS itemId,
                ip.idProduto,
                ip.Quantidade,
                ip.ValorItem
            FROM pedidos p
            LEFT JOIN itens_pedidos ip
                ON p.Id = ip.idPedido
            ORDER BY p.Id; 
        `;//ORDER BY p.ID: Mostrar os pedidos por ordem (1,2,3,...,7,..19)

        const [rows] = await connection.execute(sql);

        return rows;
    },

    adicionarItem: async (item) => {

        const conn = await connection.getConnection();

        try {

            await conn.beginTransaction();

            const sql = `INSERT INTO itens_pedidos (idPedido, idProduto, Quantidade, ValorItem) VALUES (?, ?, ?, ?);`;

            const values = [
                item.idPedido,
                item.idProduto,
                item.quantidade,
                item.valorItem
            ];

            const [result] = await conn.execute(sql, values);

            const [rowsSubTotal] = await conn.execute(
                `
                    SELECT 
                        SUM(Quantidade * ValorItem) AS total
                    FROM itens_pedidos
                    WHERE idPedido = ?;
                `,//Cálculo que será feito para saber a "quatidade" após adicionar um item 
                [item.idPedido]
            );

            const novoSubTotal = rowsSubTotal[0].total || 0;

            await conn.execute(
                `UPDATE pedidos SET SubTotal = ? WHERE Id = ?;`,
                [novoSubTotal, item.idPedido] //Arrays que substituiram os "?"
            );

            await conn.commit();

            return result;

        } catch (error) {

            await conn.rollback();
            throw error;

        } finally {

            conn.release();

        }
    },

    editarItem: async (itemId, idPedido, quantidade) => {

        const conn = await connection.getConnection();

        try {

            await conn.beginTransaction();

            const sql = `UPDATE itens_pedidos SET Quantidade = ? WHERE Id = ? AND idPedido = ?;`;

            const values = [
                quantidade,
                itemId,
                idPedido
            ];

            const [result] = await conn.execute(sql, values);

            //result.affectedRows: quantas linhas foram afetadas pela query, então se for igual a 0, aparecerá o erro”
            if (result.affectedRows === 0) {
                throw new Error('Item não encontrado para este pedido');
            }

            const [rowsSubTotal] = await conn.execute(
                `
                    SELECT 
                        SUM(Quantidade * ValorItem) AS total
                    FROM itens_pedidos
                    WHERE idPedido = ?;
                `,//Cálculo que somará o valor de todos os itens, assim dando o valor total 
                [idPedido]//Array que substitui o "?"
            );

            //Pega o valor total retornado pelo banco, assim atribuindo para a variável "novoSubTotal", caso o valor volte null, usará 0 
            const novoSubTotal = rowsSubTotal[0].total || 0;

            await conn.execute(` UPDATE pedidos SET SubTotal = ?  WHERE Id = ?;`,
                [novoSubTotal, idPedido]
            );

            await conn.commit();

            return result;

        } catch (error) {

            await conn.rollback();
            throw error;

        } finally {

            conn.release();

        }
    },

    excluirItem: async (itemId, idPedido) => {

        const conn = await connection.getConnection();

        try {

            await conn.beginTransaction();

            const sql = `DELETE FROM itens_pedidos WHERE Id = ? AND idPedido = ?;`;

            const [result] = await conn.execute(sql, [
                itemId,
                idPedido
            ]);//Valores que vão substituir "?" da query

            //result.affectedRows: quantas linhas foram afetadas pela query, então se for igual a 0, aparecerá o erro”
            if (result.affectedRows === 0) {
                throw new Error('Item não encontrado para este pedido');
            }

            const [rowsSubTotal] = await conn.execute(
                `
                    SELECT 
                        SUM(Quantidade * ValorItem) AS total
                    FROM itens_pedidos
                    WHERE idPedido = ?;
                `,//Calculo feito para daber o novo valor final/total do pedido, após excluir um item 
                [idPedido]
            );

            const novoSubTotal = rowsSubTotal[0].total || 0;

            await conn.execute( `UPDATE pedidos SET SubTotal = ? WHERE Id = ?;`,
                [novoSubTotal, idPedido]
            );

            await conn.commit();

            return result;

        } catch (error) {

            await conn.rollback();
            throw error;

        } finally {

            conn.release();

        }
    },

    excluirPedido: async (idPedido) => {

        const conn = await connection.getConnection();

        try {

            await conn.beginTransaction();

            //Apaga todos os itens que pertencem ao pedido do determinado idPedido
            await conn.execute(
                `DELETE FROM itens_pedidos WHERE idPedido = ?;`,
                [idPedido]
            );

            //Apaga pedido tabela pedidos
            const sql = `DELETE FROM pedidos WHERE Id = ?;`;

            //Primeiro remove todos os itens do pedido e depois remove o pedido em si.
            const [result] = await conn.execute(sql, [idPedido]);

            await conn.commit();

            return result;

        } catch (error) {

            await conn.rollback();
            throw error;

        } finally {

            conn.release();

        }
    }
};

export default pedidoRepository;