const Mastergrocerymodel=require('../../models/Mastergroceryshops');
async function mastergroceryedit(req,res){
    try {
      
        let { name, address, phone, location, discription, openingHours, product, rating } = req.body;
       
       let mastergroceryedititem=await Mastergrocerymodel.updateOne({ name, address, phone, location, discription, openingHours, product, rating })
        return res.status(201).json({
            message: "master edited successfully",
            data: mastergroceryedititem,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
        
    }


}
module.exports=mastergroceryedit;