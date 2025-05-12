const mongoose = require('mongoose');
const productschema = require('../../models/Products');

async function Adminupdatingproducts(req, res) {
    const { shopname, _id, ...updatedProduct } = req.body;

    const collectionname = `${shopname}products`;

    // Dynamically select or create the model for the specific collection
    let productadmingrocerymodel;
    if (mongoose.models[collectionname]) {
        productadmingrocerymodel = mongoose.models[collectionname];
    } else {
        productadmingrocerymodel = mongoose.model(collectionname, productschema);
    }

    try {
        // Find the product by _id and update it
        const updatedProductData = await productadmingrocerymodel.findByIdAndUpdate(
            _id,
            { $set: updatedProduct },
            { new: true } // Return the updated document
        );

        if (updatedProductData) {
            res.status(200).json({ message: 'Product updated successfully', data: updatedProductData });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
}

module.exports = Adminupdatingproducts;
