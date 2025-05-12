const url=require('url')
const mongoose=require('mongoose');
const productschema =require('../../models/Products');
async function Adminremovingproducts(req,res){
    let query=url.parse(req.url,true).query;
    let id=query.productId
   
    let collectionname=req.body.shopname+"products";
    if (mongoose.models[collectionname]) {
        productadmingrocerymodel = mongoose.models[collectionname];
    } else {
        productadmingrocerymodel = mongoose.model(collectionname, productschema);
    }
    try {
        let removedproduct=await productadmingrocerymodel.deleteOne({_id:id})
        res.status(201).json({
            message:"sussefully product deleted",
            data:removedproduct,
            success:true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "An error occurred while removing the item",
            error: true
        });
        
    }

}
module.exports=Adminremovingproducts