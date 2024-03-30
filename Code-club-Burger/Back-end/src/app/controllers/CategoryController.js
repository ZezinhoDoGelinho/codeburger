import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/User'

class CategoryController {
    async store(request, response) {
        //Verifica se os dados que estão chegando estão certos
        const schema = Yup.object().shape({
            name: Yup.string().required(),
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
        
        const { name } = request.body 
        const { filename: path } = request.file

        //Vendo se ela ja esta registrada
        const categoryExists = await Category.findOne({
            where:{
                name,
            },
        })

        //SE ele existe
        if(categoryExists){
            return response.status(400).json({ error: "Category already exists"})
        }

        //Criando o produto no banco de dados e armazenando o id numa variavel para retornar
        const { id } = await Category.create({ name, path })
    
        return response.json({name, id})
    }

    async index(request, response) {
        const categories = await Category.findAll() //pegando todos os produtos do banco de dados

        return response.json(categories)
    }

    async update(request, response) {
        //Verifica se os dados que estão chegando estão certos
        const schema = Yup.object().shape({
            name: Yup.string(),
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
        
        const { name } = request.body 

        const { id } = request.params

        const category = await Category.findByPk(id) //Encontrando uma categoria que tenha esse id

        if(!category){
            return response.status(401).json({ error: "Make sure your category id is correct"})
        }

        let path
        if(request.file){
            path = request.file.filename
        }
        
        //Criando o produto no banco de dados e armazenando o id numa variavel para retornar
        await Category.update({ name, path },{where: { id }})
    
        return response.status(200).json()
    }
}

export default new CategoryController()