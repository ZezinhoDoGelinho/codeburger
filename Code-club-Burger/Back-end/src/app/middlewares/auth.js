import jwt from "jsonwebtoken";
import authConfig from '../../config/auth'

export default (request, response, next) => {
    // verificando se esta chegando o token do usuario
    const authToken = request.headers.authorization

    if(!authToken){
        return response.status(401).json({ error: 'Token not provided' })
    }

    // dividindo o token em duas strings sendo q só queremos o segundo que é o token mesmo 
    const token = authToken.split(' ')[1]

    try{
        jwt.verify(token, authConfig.secret, function(err, decoded){
            //caso ele tenha encontrado algum erro ja vai pro catch
            if(err){
                throw new Error()
            }

            //Informações do user pelo token
            request.userId = decoded.id
            request.userName = decoded.name
            
            return next()
        })
    }catch (err){
        return response.status(401).json({ error: 'Token is invalid'})
    }
}