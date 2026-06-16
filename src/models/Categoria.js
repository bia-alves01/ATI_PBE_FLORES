//Getters: serve para pegar um valor.
//Setters: serve para alterar um valor, podendo também fazer validações antes de salvar.

export class Categoria {

    // atributos privados da classe
    #id;
    #nome;
    #descricao;
    #dataCad;

    // construtor da classe
    constructor(pNome, pDescricao, pId) {

        // atribui os valores usando os setters
        this.nome = pNome;
        this.descricao = pDescricao;
        this.id = pId;
    }

    // getter do id
    get id() {
        return this.#id;
    }

    // setter do id
    set id(value) {

        // valida o id antes de salvar
        this.#validarId(value);

        this.#id = value;

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

    // getter da descricao
    get descricao() {
        return this.#descricao;
    }

    // setter da descricao
    set descricao(value) {

        // valida a descricao antes de salvar
        this.#validarDescricao(value);

        this.#descricao = value;
    }

    // Metodos Auxiliares

    // valida o id
    #validarId(value) {

        if (value && value <= 0) {
            throw new Error('Id inválido');
        }
    }

    // valida o nome
    #validarNome(value) {

        if (!value || value.trim().length < 3 || value.trim().length > 45) {

            throw new Error('o campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }

    // valida a descricao
    #validarDescricao(value) {

        if (value && (value.trim().length < 10 || value.trim().length > 100)) {

            throw new Error('o campo nome é obrigatório e deve ter entre 10 e 100 caracteres');
        }
    }

    // Cria uma nova categoria
    static criar(dados) {

        return new Categoria(
            dados.nome,
            dados.descricao,
            null
        );
    }

    // Altera uma categoria existente
    static alterar(dados, id) {

        return new Categoria(
            dados.nome,
            dados.descricao,
            id
        );
    }
}