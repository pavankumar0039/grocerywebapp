const mongoose=require('mongoose');


const Productsschema=new mongoose.Schema({
    productname:{
        type:String
    },
    email:{
        type:String
    },
    productpic:{
        type:String
    },
    price:{
        type:String
    },
    offers:{
        type:String
    },
    rating:{
        type:String
    },
    category:{
        type:String
    }
})

module.exports=Productsschema