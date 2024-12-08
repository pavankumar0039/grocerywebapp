const mongoose=require('mongoose')
const Cartschema=require('../../models/Usercart')
async function Removefromcart(req,res){
     let {email}=req.body.email
     let product_id=req.body.productid;
    let collectionname=email+"cart";
    console.log(collectionname);
    if (mongoose.models[collectionname]) {
        cartmodel = mongoose.models[collectionname];
    } else {
        cartmodel = mongoose.model(collectionname, Cartschema);
    }
    try {
        let cartremovedproduct=await cartmodel.findOneAndDelete({ product_id })
        res.status(200).json({
            message:"product delete to cart",
            data:cartremovedproduct,
            success:true
        })
    } catch (error) {

         res.status(500).json({
            message:error.message || error,
            
            success:false
        })
    }

}
module.exports=Removefromcart