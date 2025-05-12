const UserModel = require("../../models/Usermodel");
const bcryptjs = require("bcryptjs");

async function registerUser(req, res) {
    try {
        const { accounttype,username,email, password,location,profilepic,phone,address } = req.body;
        
       
        console.log("user");

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
                error: true
            });
        }

        // Generate salt and hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create user payload with hashed password
        const userPayload = {
            accounttype:accounttype,
            username:username,
            email:email,
            location:location,
            profilepic:profilepic,
            phone:phone,
            address:address,
            password: hashedPassword
        };

        // Save the new user to the database
        const newUser = new UserModel(userPayload);
        const savedUser = await newUser.save();

        // Send success response
        return res.status(201).json({
            message: "User created successfully",
            data: savedUser,
            success: true
        });
    } catch (error) {
        // Send error response in case of failure
        return res.status(500).json({
            message: error.message || "Server Error",
            error: true
        });
    }
}

module.exports = registerUser;
