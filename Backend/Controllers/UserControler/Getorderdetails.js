const mongoose = require('mongoose');
const Checkoutschema = require('../../models/Orders');

async function Getorderdetails(req, res) {
    let email = req.body.email;
    const collectionname = email + "order";
    
    let checkoutmodel;
    if (mongoose.models[collectionname]) {
        checkoutmodel = mongoose.models[collectionname];
    } else {
        checkoutmodel = mongoose.model(collectionname, Checkoutschema);
    }
    try {
        let orderdetails=await checkoutmodel.find();
        res.status(200).json({
            message: "fetched Orders successfully.",
            data: orderdetails,
            success: true
        }); 
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({
            message: error.message || "An error occurred while getting the orders.",
            success: false
        });
        
    }
}
module.exports=Getorderdetails;
