const Admingroceryschema = require('../../models/Admingrocery');
const mongoose = require('mongoose');

async function Admingrocerycreation(req, res) {
    let { accounttype, email: adminemail, name, address, phone, location, discription, openingHours, product, rating,email } = req.body;
    let payload = { name, address, phone, location, discription, openingHours, product, rating,email };
    let collectionname = accounttype + adminemail + "groceryshops";

    let Admingrocerymodel;
    try {
      
        if (mongoose.models[collectionname]) {
            Admingrocerymodel = mongoose.models[collectionname];
        } else {
            Admingrocerymodel = mongoose.model(collectionname, Admingroceryschema);
        }

        let Admingroceryitem = new Admingrocerymodel(payload);
        let Admingroceryitemsave = await Admingroceryitem.save();

        return res.status(201).json({
            message: "Master created successfully",
            data: Admingroceryitemsave,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = Admingrocerycreation;
