import Sequelize, { Model, VIRTUAL } from "sequelize";

class Product extends Model {
    static init(sequelize){
        super.init({
                name: Sequelize.STRING,
                price: Sequelize.INTEGER,
                path: Sequelize.STRING,
                offer: Sequelize.BOOLEAN,
                url: {
                    type: Sequelize.VIRTUAL,
                    get(){
                        return `http://localhost:3001/product-file/${this.path}` // url que pega a imagem dentro da aplicação
                    },
                },
            },
            {
                sequelize,
            }
        )
        return this
    }
    static associate(models){
        //Fazendo relacionamento da "category_id" da tabela "categories" com a "category" do produto
        this.belongsTo(models.Category, { 
            foreignKey: 'category_id', 
            as: 'category',
        })
        
    }
}

export default Product