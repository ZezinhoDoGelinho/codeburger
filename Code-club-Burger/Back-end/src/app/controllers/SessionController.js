// Responsavel pelo Login do usuario

import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import User from '../models/User'

class SessionController {
    async store(request, response) {
        
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })

        // Função que retona mensagen de erro
        const userEmailOrPasswordIncorrect = () => {
            return response.status(400).json({ message: 'Make sure your password or email are correct' })
        }

        // Caso ocorra algun erro 
        try{
            await schema.validateSync(request.body, { abortEarly:false }) // verifica se ta tudo certo
        } catch (err) {
            return response.status(400).json({ error: err.errors}) // retorna todos os erros 
        }

        // Retornando erro 
        if(!(schema.isValid(request.body))) { userEmailOrPasswordIncorrect() }

        const { email, password } = request.body

        const user = await User.findOne({ // buscando no banco de dados se existe o email que esta tentando logar
            where: { email },
        })

        // Retornando erro 
        if(!user) { userEmailOrPasswordIncorrect() }

        // mandando nossa senha para verificar se ela está certa 
        //SE tiver algo errado
        if(!(await user.checkPassword(password))) { userEmailOrPasswordIncorrect() }

        try{
            // Retornando as informações de usuario caso tudo esteja certo
            return response.json({ 
                id: user.id,
                email, 
                name: user.name, 
                admin: user.admin,
                // Gerando um token que verifica se ele esta logado para reforçar a segurança
                token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn, // Gerando o tempo de espiração desse token
                })
            }) 
        }catch(err){
            return response.status(404).json()
        }
        
           
    }
}

export default new SessionController()