import { Router } from "express" //pegando só a parte do express responsavel pelas rotas (no caso o "Router")
import multer from "multer"
import multerConfig from './config/multer'

import UserController from "./app/controllers/UserController"
import SessionController from "./app/controllers/SessionController"
import ProductController from "./app/controllers/ProductController"
import CategoryController from "./app/controllers/CategoryController"
import OrderController from "./app/controllers/OrderController"

import authMiddleware from './app/middlewares/auth'

const upload = multer(multerConfig) //Config para mandar fotos dos produtos

const routes = new Router() //Armazenando o router em uma variavel

//       ==--==--==             ROTAS             ==--==--==

//Cadastro de usuario
routes.post('/users', UserController.store)

//Login
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware) //Todas as rotas abaixo irão usar esse middleware

//Produtos
routes.post('/products', upload.single('file'), ProductController.store) //Cadastrar produto
routes.get('/products', ProductController.index) //Pegar todos os produtos
routes.put('/products/:id', upload.single('file'), ProductController.update) //Atualizar produto

//Categorias
routes.post('/categories',upload.single('file'), CategoryController.store) //Cadastrar categoria
routes.get('/categories', CategoryController.index) //retornar todas as categorias
routes.put('/categories/:id', upload.single('file'), CategoryController.update) //Alterar informações

//Pedidos
routes.post('/orders', OrderController.store) //Gerar pedido
routes.get('/orders', OrderController.index) //Pegar todos os pedidos
routes.put('/orders/:id', OrderController.update) //Atualização do status do pedido

export default routes