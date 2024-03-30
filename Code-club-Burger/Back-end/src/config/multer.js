// Responsavel por receber imagens e renomear elas para nao termons imagens duplicadas
// tambem saber onde ela esta

import multer from "multer";
import { v4 } from 'uuid'
import { extname, resolve } from 'path'

export default {
    storage: multer.diskStorage({
        //Lugar onde vamos guardar as imagens
        destination: resolve(__dirname, '..', '..', 'uploads'),
        //Mudando o nome para nao haver erros de fotos com mesmo nome
        filename: (request, file, callback) => {
            return callback(null, v4() + extname(file.originalname))
        },
    }),
}