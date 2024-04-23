import express from "express" 
import routes from "./routes"
import { resolve } from 'path'
import cors from 'cors'

import './database'

class App {
    //Toda vez que eu instacio uma classe o metodo "contructor" é chamado
    constructor(){
        //Deixando o express disponivel 
        this.app = express()
        this.app.use(cors())

        //Assim que o app iniciar as funções abaixo serão executadas
        this.middlewares()
        this.routes()
    }
    
    middlewares(){
        // Avisando para o express do app que vamos usar "json"
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
        // Deixando as minhas rotas disponiveis para o app
        this.app.use(routes) 
    }
}


export default new App().app