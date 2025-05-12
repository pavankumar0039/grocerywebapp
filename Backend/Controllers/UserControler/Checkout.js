const mongoose = require('mongoose');
const Checkoutschema = require('../../models/Orders');

async function Checkout(req, res) {
    let email = req.body.email;
    let products = req.body.cartItems;
    console.log(products)
    let updatedProducts = products.map(({ _id, ...rest }) => rest);
   

    if (!email || !products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
            message: "Invalid input. Please provide a valid email and a list of products.",
            success: false
        });
    }

    const collectionname = email + "order"; 
    let checkoutmodel;

    try {
        // Check if the model already exists to avoid redefinition
        if (mongoose.models[collectionname]) {
            checkoutmodel = mongoose.models[collectionname];
        } else {
            checkoutmodel = mongoose.model(collectionname, Checkoutschema);
        }

        // Prepare the products for insertion
        const orderdetails = updatedProducts.map(prod => ({
            ...prod, // Include the product details
            email: email, // Add email as part of each order item
            createdAt: new Date(), // Optionally add timestamp
        }));
          console.log(orderdetails)
        // Insert multiple products into the collection
        const orderdetailssave = await checkoutmodel.insertMany(orderdetails);

        res.status(200).json({
            message: "Order added successfully.",
            data: orderdetailssave,
            success: true
        });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({
            message: error.message || "An error occurred while saving the order.",
            success: false
        });
    }
}

module.exports = Checkout;
