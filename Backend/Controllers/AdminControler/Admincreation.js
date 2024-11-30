const AdminModel = require("../../models/Adminmodel");
const bcryptjs = require('bcryptjs')
async function registerAdmin(req, res) {
    try {
        const { email, password } = req.body;
        console.log("admin")
        const checkEmail = await AdminModel.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({
                message: "Already exits",
                error: true
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password, salt)
        const payload = {
            ...req.body,
            password: hashpassword
        }
        const user = new AdminModel(payload)
        const usersave = await user.save()
        return res.status(201).json({
            message: "user created successfully",
            data: usersave,
            success: true
        })
    }
    catch (error) {
        return res.status(500).json({ 
            message: error.message || error,
            error: true
        })
    }
}

module.exports = registerAdmin