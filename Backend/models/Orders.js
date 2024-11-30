const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({
    productname: {
        type: String,
      
    },
    email: {
        type: String,
       
    },
    productpic: {
        type: String,
    },
    price: {
        type: Number, 
       
    },
    quantity: {
        type: Number, 
       
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
    },
    date: { type: Date, default: Date.now }
});

module.exports =  CheckoutSchema;
