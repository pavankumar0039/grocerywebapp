const Adminmodel = require('../../models/Adminmodel');

async function Admineditprofile(req, res) {
    const { _id, ...data } = req.body;
   

    try { 
       
        const updatedAdmin = await Adminmodel.updateMany({ _id }, { $set: data });


        res.status(200).json({ message: 'Profile updated successfully', data: updatedAdmin, success: true });

    } catch (error) {
        
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
}

module.exports = Admineditprofile;
