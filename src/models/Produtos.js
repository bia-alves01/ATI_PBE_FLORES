export class Produtos {

    // atributos privados da classe
    #id;
    #nome;
    #descricao;
    #preco;
    #vinculoImagem;
    #qtdEstoque;
    #idCategoria;

    // construtor da classe
    constructor(pId, pNome, pDescricao, pPreco, pVinculoImagem, pQtdEstoque, pIdCategoria) {

        // atribui os valores recebidos
        this.#id = pId;
        this.nome = pNome;
        this.descricao = pDescricao;
        this.preco = pPreco;
        this.imagem = pVinculoImagem;
        this.qtdEstoque = pQtdEstoque;
        this.idCategoria = pIdCategoria;
    }

    // getter do id
    get id() {
        return this.#id;
    }

    // getter do nome
    get nome() {
        return this.#nome;
    }

    // setter do nome
    set nome(value) {

        // valida o nome antes de salvar
        this.#validarNome(value);

        this.#nome = value;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(value) {

        this.#validarDescricao(value);

        this.#descricao = value;
    }

    get preco() {
        return this.#preco;
    }

    set preco(value) {

        this.#validarPreco(value);

        this.#preco = value;
    }

    get vinculoImagem() {
        return this.#vinculoImagem;
    }

    set imagem(value) {

        this.#validarImagem(value);

        this.#vinculoImagem = value;
    }

    get qtdEstoque() {
        return this.#qtdEstoque;
    }

    set qtdEstoque(value) {

        this.#validarQtd(value);

        this.#qtdEstoque = value;
    }

    get idCategoria() {
        return this.#idCategoria;
    }

    set idCategoria(value) {

        this.#validarIdCategoria(value);

        this.#idCategoria = value;
    }

    // Metodos Auxiliares

    // valida o nome
    #validarNome(value) {

        if (!value || value.trim().length < 3 || value.trim().length > 45) {

            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }

    // validar descreição
    #validarDescricao(value) {

        if (!value || value.trim().length < 3 || value.trim().length > 100) {

            throw new Error('O campo descrição é obrigatório e deve ter entre 3 e 100 caracteres');
        }
    }

    // validar preço
    #validarPreco(value) {

        if (value === undefined || value < 0) {

            throw new Error('O campo preco é obrigatório e deve ser um número positivo');
        }
    }

    //validar quantidade
    #validarQtd(value) {

        if (value === undefined || value < 0) {

            throw new Error('O campo quantidade estoque é obrigatório e deve ser um número positivo');
        }
    }

    // validar imagem 
    #validarImagem(value) {

        if (!value || value.trim().length < 3 || value.trim().length > 250) {

            throw new Error('O campo imagem é obrigatório e deve ter entre 3 e 250 caracteres');
        }
    }

    // vlidar id da categoria
    #validarIdCategoria(value) {

        if (value === undefined || value < 0) {

            throw new Error('O campo idCategoria é obrigatório e deve ser um número positivo');
        }
    }

    // cria um novo produto
    static criar(dados) {

        return new Produtos(
            null,
            dados.nome,
            dados.descricao,
            dados.preco,
            dados.vinculoImagem,
            dados.qtdEstoque,
            dados.idCategoria
        );
    }

    // altera um produto existente
    static alterar(dados, id) {

        return new Produtos(
            id,
            dados.nome,
            dados.descricao,
            dados.preco,
            dados.vinculoImagem,
            dados.qtdEstoque,
            dados.idCategoria
        );
    }
}