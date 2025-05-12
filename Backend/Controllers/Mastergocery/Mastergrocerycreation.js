const Mastergrocerymodel=require('../../models/Mastergroceryshops');
async function mastergroceryinsertion(req,res){
    try {
        let mastergroceryitem=new Mastergrocerymodel(req.body);
        let mastergroceryitemsave=await mastergroceryitem.save();
        return res.status(201).json({
            message: "master created successfully",
            data: mastergroceryitemsave,
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