const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
       
    },
    productpic: {
        type: String,
    },
    price: {
        type: Number, 
        required: true,
    },
    quantity: {
        type: Number, 
        required: true,
        default: 1, 
    },
    offers: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0, 
        max: 5, 
    },
    category: {
        type: String,
    }
});

module.exports =  CartSchema;
