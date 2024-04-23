//Aqui exportamos as config do sequelize
module.exports = {
    dialect: 'postgres',  //banco de dados que utilizaremos
    host: 'localhost',    //host onde podemos acessar esse banco de dados
    username: 'postgres', //Username que colocamos no nosso banco de dados
    password: 'postgres', //Senha que colocamos no nosso banco de dados
    database: 'codeburger', //Nome do database que usaremos
    
    //definições 
    define: {
        timestamps: true, //ele diz se vai ter created_at/updated_at
        //é só para separar o nome com "_"
        underscored: true,   
        underscoredAll: true,
    },  
}
