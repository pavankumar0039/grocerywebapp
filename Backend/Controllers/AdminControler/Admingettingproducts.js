const productschema =require('../../models/Products');
const mongoose=require('mongoose');
async function Admingettingproducts(req,res){

    let shop=req.body;
    console.log(shop);
    let collectionname=shop.name+"products";
    if (mongoose.models[collectionname]) {
        productadmingrocerymodel = mongoose.models[collectionname];
    } else {
        productadmingrocerymodel = mongoose.model(collectionname, productschema);
    }
    try {
        let admingroceryproducts=await productadmingrocerymodel.find();
        console.log(admingroceryproducts)
        res.status(200).json({
            message:"successfully fetched admin grocery shop products",
            data:admingroceryproducts,
            success:true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "An error occurred while fetching the items",
            error: true
        });
        
    }

}
module.exports=Admingettingproducts