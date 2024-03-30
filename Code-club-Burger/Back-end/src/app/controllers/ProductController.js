import * as Yup from 'yup'
import Product from '../models/Product'
import Category from '../models/Category'
import User from '../models/User'

class ProductController {
    async store(request, response) {
        //Verifica se os dados que estão chegando estão certos
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
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

        //pegando as informações 
        const { filename: path } = request.file //nome da imagem
        const { name, price, category_id, offer } = request.body //infos do produto


        //Criando o produto no banco de dados e armazenando numa variavel
        const product = await Product.create({ 
            name, 
            price, 
            category_id,
            path,
            offer,
        })
    
        return response.json(product)
    }

    async index(request, response) {
        const products = await Product.findAll({ //pegando todos os produtos do banco de dados
            //fazendo ele incluir a categoria
            include:[
            {
                model: Category, // modelo que estamos icluindo
                as: 'category', //dando apelido a ele 
                attributes: ['id', 'name',] //atribudos dele que queremos
            }]
        }) 

        return response.json(products)
    }

    //FUnção Para atualizar algum dado do produto
    async update(request, response) {
        //Verifica se os dados que estão chegando estão certos
        const schema = Yup.object().shape({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean(),
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

        const { id } = request.params

        const product = await Product.findByPk(id)

        if(!product){
            return response.status(401).json({error: "Make sure your product ID is correct"})
        }

        let path
        if(request.file){
            path = request.file.filename
        }

        //pegando as informações 
        const { name, price, category_id, offer } = request.body //infos do produto

        //Atualizando o produto no banco de dados
        await Product.update(
            { 
            name, 
            price, 
            category_id,
            path,
            offer,
            },
            { where: { id } }
        )
    
        return response.status(200).json()
    }
}

export default new ProductController()