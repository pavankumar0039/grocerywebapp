const UserModel = require('../../models/Usermodel');

async function Admineditprofile(req, res) {
    const { _id, ...data } = req.body;


    try {
        // Update admin data by _id
        const updateduser = await UserModel.updateMany({ _id }, { $set: data });


        res.status(200).json({ message: 'Profile updated successfully', data: updateduser, success: true });


    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
}

module.exports = Admineditprofile;
