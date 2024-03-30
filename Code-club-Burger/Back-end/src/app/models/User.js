import  Sequelize, { Model } from "sequelize";
import bcrypt from 'bcrypt'

class User extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN,
            },
            {
                sequelize, 
            }
        )
        
        // Ates dele salvar vamos fazer ele enviar o hash de senha nao a senha em si
        this.addHook('beforeSave', async(user) => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 10) // parametros: senha, força da cryptografia
            }
        })

        return this
    }

    // COmparando a senha e a senha criptografada para ver se as duas batem
    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash)
    }
}

export default User