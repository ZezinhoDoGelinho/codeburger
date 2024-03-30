// Responsavel pelo Cadastro do usuario

import { v4 } from 'uuid'
import User from '../models/User'
import * as Yup from 'yup' // pegando todos os "export" do yup e guardado em um lugar só (no caso "Yup")

class UserController {
    async store(request,response){
        // Estrutura de validação das informações
        const schema = Yup.object().shape({
            // required => campo obrigatorio
            // min => minimo de caracteres
            name: Yup.string().required(), 
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean(),
        })

        // Caso ocorra algun erro 
        try{
            await schema.validateSync(request.body, { abortEarly:false }) // verifica se ta tudo certo
        } catch (err) {
            return response.status(400).json({ error: err.errors}) // retorna todos os erros 
        }
        

        const { name, email, password, admin } = request.body

        // verificando se o Email ja esta sendo usado
        const userExist = await User.findOne({ // procurando no banco de dados o email
            where: { email },
        })
        
        //SE ele ja estiver cadastrado
        if(userExist){
            return response.status(409).json({ error: 'User already exists' })
        }

        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin,
        })
        
        return response.status(201).json({id: user.id, name, email, admin})
    }
}

export default new UserController()