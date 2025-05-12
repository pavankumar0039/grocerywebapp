const mongoose=require('mongoose')
const Cartschema=require('../../models/Usercart')
async function Addtocart(req,res){
     let {email}=req.body
     let product=req.body;
    let collectionname=email+"cart";
    if (mongoose.models[collectionname]) {
        cartmodel = mongoose.models[collectionname];
    } else {
        cartmodel = mongoose.model(collectionname, Cartschema);
    }
    try {
        let cartproduct=new cartmodel(product)
        let cartsaveproduct=await cartproduct.save();
        res.status(200).json({
            message:"product added successfully to cart",
            data:cartsaveproduct,
            success:true
        })
    } catch (error) {

         res.status(500).json({
            message:error.message || error,
            
            success:false
        })
    }

}
module.exports=Addtocart