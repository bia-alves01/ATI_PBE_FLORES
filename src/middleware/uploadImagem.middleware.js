import createMulter from "../configs/upload.multer.js";

// configura o upload de imagens
const uploadImage = createMulter({

    // pasta onde as imagens serão salvas
    pasta: 'imagens',

    // tipos de arquivos permitidos
    tiposPermitidos: ['image/png', 'image/jpeg', 'image/jpg'],

    // tamanho máximo do arquivo
    tamanhoArquivo: 10 * 1024 // tamanho: 10 MB

// permite enviar apenas um arquivo
}).single('vinculoImg');

export default uploadImage;