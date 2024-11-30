const mongoose=require('mongoose')
const Cartschema=require('../../models/Usercart')
async function Usercartproducts(req,res){
     let {email}=req.body
   
    let collectionname=email+"cart";
    if (mongoose.models[collectionname]) {
        cartmodel = mongoose.models[collectionname];
    } else {
        cartmodel = mongoose.model(collectionname, Cartschema);
    }
    try {
        
        let cartproducts=await cartmodel.find();
        res.status(200).json({
            message:"successfully fetched products",
            data:cartproducts,
            success:true
        })
    } catch (error) {

         res.status(500).json({
            message:error.message || error,
            
            success:false
        })
    }

}
module.exports=Usercartproducts