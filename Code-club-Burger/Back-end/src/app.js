import express from "express"
import routes from "./routes"
import { resolve } from 'path'
import cors from 'cors'

import './database'

class App {
    constructor(){
        this.app = express()
        this.app.use(cors())

        this.middlewares()
        this.routes()
    }
    
    middlewares(){
        // Avisando para toda a aplicação que vamos usar "json"
        this.app.use(express.json()) 

        //Quando alguem acessar essa rota ele precisa procurar o arquivo dentro da pasta upload para produto
        this.app.use(
            '/product-file', 
            express.static(resolve(__dirname, '..', 'uploads'))
        ) 

        //categoria
        this.app.use(
            '/category-file', 
            express.static(resolve(__dirname, '..', 'uploads'))
        ) 
    }

    routes(){
        this.app.use(routes) // Deixando as minhas rotas disponiveis para toda a aplicação
    }
}


export default new App().app