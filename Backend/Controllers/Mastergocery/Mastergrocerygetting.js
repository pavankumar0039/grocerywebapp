const Mastergrocerymodel=require('../../models/Mastergroceryshops');
async function mastergroceryinsertion(req,res){
    try {
        
        let mastergroceryitems=await Mastergrocerymodel.find();
        return res.status(201).json({
            message: "master created successfully",
            data: mastergroceryitems,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
        
    }


}
module.exports=mastergroceryinsertion;