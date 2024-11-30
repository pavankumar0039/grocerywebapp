const productschema =require('../../models/Products');
const mongoose=require('mongoose');

async function productinsertion(req,res){
    let {productname,email,productpic,price,offers,rating,category,shopname} = req.body;
    let payload = { productname,email,productpic,price,offers,rating,category};
    let collectionname = shopname+"products";
  console.log(payload);
  console.log(collectionname);
    let productadmingrocerymodel;

    try {

        if (mongoose.models[collectionname]) {
            productadmingrocerymodel = mongoose.models[collectionname];
        } else {
            productadmingrocerymodel = mongoose.model(collectionname, productschema);
        }

        let productadmingroceryitem = new productadmingrocerymodel(payload);
        let productadmingroceryitemsave = await productadmingroceryitem.save();

        return res.status(201).json({
            message: "product created successfully",
            data: productadmingroceryitemsave,
            success: true
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
        
    }
}
module.exports=productinsertion;