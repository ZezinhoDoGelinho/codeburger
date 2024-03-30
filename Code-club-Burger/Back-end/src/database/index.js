import Sequelize from "sequelize";
import mongoose from "mongoose";

import configDatabase from '../config/database'

import User from '../app/models/User'
import Product from "../app/models/Product";
import Category from "../app/models/Category";

const models = [User, Product, Category]

class Database {
    constructor(){
        this.init()
        this.mongo()
    }

    //Conecsão entre o Sequelize e nossa aplicação
    init() {
        this.connection = new Sequelize(configDatabase)
        models.map( model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models)) //Aqui ele faz a conecção entre os modelos "product" e "category_id"
    }

    //
    mongo(){
        this.mongoConection = mongoose.connect(
            'mongodb://localhost:27017/codeburger',
            //{useNewUrlParser: true,useUnifiedTopology: true,} //opções obsoletas
        )
    }
}

export default new Database()
