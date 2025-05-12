const Mastergrocerymodel=require('../../models/Mastergroceryshops');
async function mastergrocerydeletion(req,res){
    try {
      
        let { name, address, phone, location, discription, openingHours, product, rating } = req.body;
       
       let mastergrocerydeleteditem=await Mastergrocerymodel.deleteOne({ name, address, phone, location, discription, openingHours, product, rating })
        return res.status(201).json({
            message: "master deleted successfully",
            data: mastergrocerydeleteditem,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
        
    }


}
module.exports=mastergrocerydeletion;