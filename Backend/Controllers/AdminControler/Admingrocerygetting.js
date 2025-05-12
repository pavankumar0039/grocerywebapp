const mongoose=require('mongoose')
const Admingroceryschema=require('../../models/Admingrocery')
async function Admingrocerygetting(req,res){

    let email=req.body.email;
    if (!email) {
        return res.status(400).json({
            message: "Email is required",
            success: false
        });
    }
   
    let collectionname="admin"+email+"groceryshops";
    let Admingrocerymodel = mongoose.models[collectionname] || mongoose.model(collectionname, Admingroceryschema);
    if(!Admingrocerymodel)
    {
        res.status(401).json({
            message:"Admin not found",
            success:false
        })

    }
    try {
        let admingroceryshops=await Admingrocerymodel.find();
        res.status(200).json({
            message:"successfully fetched admin grocery shops",
            data:admingroceryshops,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "An error occurred while fetching the items",
            error: true
        });
        
    } 
 


}
module.exports=Admingrocerygetting