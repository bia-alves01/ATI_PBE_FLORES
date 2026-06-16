await tempConnection.query(`
    CREATE TABLE IF NOT EXISTS clientes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(45) NOT NULL,
        cpf CHAR(11) NOT NULL UNIQUE,
        telefone CHAR(11) NOT NULL,
        dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`);

await tempConnection.query(`
    CREATE TABLE IF NOT EXISTS enderecos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        idCliente INT NOT NULL,
        logradouro VARCHAR(100) NOT NULL,
        numero VARCHAR(10) NOT NULL,
        complemento VARCHAR(50),
        bairro VARCHAR(50),
        cidade VARCHAR(50) NOT NULL,
        uf CHAR(2) NOT NULL,
        cep CHAR(8) NOT NULL,

        CONSTRAINT FK_enderecos_clientes
            FOREIGN KEY (idCliente)
            REFERENCES clientes(id)
    );
`);

await tempConnection.query(`
    CREATE TABLE IF NOT EXISTS telefones (
        id INT PRIMARY KEY AUTO_INCREMENT,
        idCliente INT NOT NULL,
        telefone CHAR(11) NOT NULL,

        CONSTRAINT FK_telefones_clientes
            FOREIGN KEY (idCliente)
            REFERENCES clientes(id)
    );
`);

await tempConnection.query(`
    CREATE TABLE IF NOT EXISTS categorias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(45) NOT NULL,
        descricao VARCHAR(100),
        dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`);

await tempConnection.query(`
    CREATE TABLE IF NOT EXISTS produtos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        idCategoria INT NOT NULL,
        descricao VARCHAR(100),
        nome VARCHAR(100) NOT NULL,
        preco DECIMAL(10,2) NOT NULL,
        vinculoImagem VARCHAR(255),
        qtdEstoque DECIMAL(18,2) NOT NULL,
        dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT FK_produtos_categorias
            FOREIGN KEY (idCategoria)
            REFERENCES categorias(id)
    );
`);

await tempConnection.query(`
    CREATE TABLE IF NOT EXISTS pedidos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        idCliente INT NOT NULL,
        subTotal DECIMAL(18,2) NOT NULL,
        status ENUM('Aberto','Finalizado','Pendente') NOT NULL,
        dataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT FK_pedidos_clientes
            FOREIGN KEY (idCliente)
            REFERENCES clientes(id)
    );
`);

await tempConnection.query(`
    CREATE TABLE IF NOT EXISTS itens_pedidos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        idPedido INT NOT NULL,
        idProduto INT NOT NULL,
        quantidade DECIMAL(18,2) NOT NULL,
        valorItem DECIMAL(18,2) NOT NULL,

        CONSTRAINT FK_itens_pedidos_pedidos
            FOREIGN KEY (idPedido)
            REFERENCES pedidos(id),

        CONSTRAINT FK_itens_pedidos_produtos
            FOREIGN KEY (idProduto)
            REFERENCES produtos(id)
    );
`);