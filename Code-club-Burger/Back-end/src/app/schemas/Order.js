import mongoose from "mongoose";
import { INTEGER } from "sequelize";
import { number } from "yup";

const OrderSchema = new mongoose.Schema({
    user:{
        id:{
            type:String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    products:[{
        id:{
            type: Number,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }],
    status:{
        type: String,
        required: true,
    },
},
{
    timestamps: true, //aqui ele salva as informações de data e hora
})

export default mongoose.model('Order', OrderSchema)