const Admingroceryschema = require('../../models/Admingrocery');
const mongoose = require('mongoose');

async function Admingroceryedit(req, res) {
    try {
        const { accounttype, email: adminemail, name, address, phone, location, description, openingHours, product, rating } = req.body;
       
        let collectionname = `${accounttype}${adminemail}groceryshops`;
        const payload = { name, address, phone, location, description, openingHours, product, rating };

       
        let Admingrocerymodel = mongoose.models[collectionname] || mongoose.model(collectionname, Admingroceryschema);
     
        const admingroceryedititem = await Admingrocerymodel.updateOne(payload);

        return res.status(200).json({
            message: "Admingrocery item edited successfully",
            data: admingroceryedititem,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "An error occurred while deleting the item",
            error: true
        });
    }
}

module.exports = Admingroceryedit;
