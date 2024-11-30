const Admingroceryschema = require('../../models/Admingrocery');
const mongoose = require('mongoose');

async function Admingrocerydeletion(req, res) {
    try {
        const { accounttype, email: adminemail, name, address, phone, location, description, openingHours, product, rating } = req.body;
       
        let collectionname = `${accounttype}${adminemail}groceryshops`;
        const payload = { name, address, phone, location, description, openingHours, product, rating };

    
        let Admingrocerymodel = mongoose.models[collectionname] || mongoose.model(collectionname, Admingroceryschema);
     
        const admingrocerydeletionitem = await Admingrocerymodel.deleteOne(payload);

        return res.status(200).json({
            message: "Admingrocery item deleted successfully",
            data: admingrocerydeletionitem,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "An error occurred while deleting the item",
            error: true
        });
    }
}

module.exports = Admingrocerydeletion;
