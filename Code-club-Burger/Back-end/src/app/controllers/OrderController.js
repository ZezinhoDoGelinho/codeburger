// Responsavel pelo Cadastro do usuario

import * as Yup from 'yup' // pegando todos os "export" do yup e guardado em um lugar só (no caso "Yup")
import Product from '../models/Product'
import Category from '../models/Category'
import Order from '../schemas/Order'
import User from '../models/User'

class OrderController {
    //Função que cria o pedido
    async store(request,response){
        // Estrutura de validação das informações
        const schema = Yup.object().shape({
            products: Yup.array()
            .required()
            .of(
                Yup.object().shape({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            ), 
        })

        
        // Caso ocorra algun erro 
        try{
            await schema.validateSync(request.body, { abortEarly:false }) // verifica se ta tudo certo
        } catch (err) {
            return response.status(400).json({ error: err.errors}) // retorna todos os erros 
        }

        //pegando o id de produto por produto
        const productsId = request.body.products.map( product => product.id)

        //Pegando as onformações dos produtos solicitados no banco de dados
        const uptatedProducts = await Product.findAll({
            where:{
                id: productsId,
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                }
            ]
        })

        //Organizando as informações 
        const editedProduct = uptatedProducts.map( product =>{ //map pegando item por item e criando um novo objeto
            //Pegando o index do pedido dentro do array de "products" para saber a quantidade que esta sendo pedido
            const productIndex = request.body.products.findIndex( 
                requestProduct => requestProduct.id === product.id
            )

            const newProduct ={
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category.name,
                url: product.url,
                quantity: request.body.products[productIndex].quantity,
            }

            return newProduct
        })
        
        //Informações do pedido
        const order = {
            //Usuario que esta fazendo o pedido
            user: {
                id: request.userId,
                name: request.userName,
            },
            //Pedido
            products: editedProduct,
            status: 'Pedido realizado',
        }

        //Gravando os dados no mongoDB
        const orderResponse = await Order.create(order)

        return response.status(201).json(orderResponse)
    }

    //Função que Pega todos os pedidos
    async index(request, response){
        const orders = await Order.find()

        return response.json(orders)
    }

    //Função que atualiza o status do pedido
    async update(request, response){
        const schema = Yup.object().shape({
            status: Yup.string().required()
        })

        // Caso ocorra algun erro 
        try{
            await schema.validateSync(request.body, { abortEarly:false }) // verifica se ta tudo certo
        } catch (err) {
            return response.status(400).json({ error: err.errors}) // retorna todos os erros 
        }

        //Vendo se ele é um admin
        const { admin: isAdmin} = await User.findByPk(request.userId)

        if(!isAdmin){
            return response.status(401).json()
        }

        const { id } = request.params //Pegando o id do pedido
        const { status } = request.body //Pegando o status do pedido

        try {
            await Order.updateOne({ _id: id }, { status }) //Atualizando no mongoDB
        }catch(error){
            return response.status(400).json({ error: error.message })
        }

        return response.json({ message: 'Status was updated'})
    }
}

export default new OrderController()