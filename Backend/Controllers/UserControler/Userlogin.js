const UserModel = require('./../../models/Usermodel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function Userlogin(req, res) {
    try {
        let { email, password } = req.body;
        console.log(req.body);
        // Use findOne instead of find to get a single user object
        const user = await UserModel.findOne({ email: email });
        
        if (!user) {
           
            return res.status(404).json({
                message: "User not found",
                error: true
            });
        }

        // Compare password with bcrypt
        const verifypassword = await bcryptjs.compare(password, user.password);
        if (!verifypassword) {
            console.error('Password mismatch');
            return res.status(400).json({
                message: "Please check password",
                error: true
            });
        }

        // Creating token data with user details
        const tokendata = {
            id: user._id,
            email: user.email
        };

        // Sign the token with a secret key
        const token = jwt.sign(tokendata, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        // Set cookie options
        const cookiesoption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        };

        // Send token as a cookie in the response
        return res.cookie('token', token, cookiesoption).status(200).json({
            message: "Login successfully",
            data: {
                token:token,
                dataofuser:user
            },
            success: true
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = Userlogin;
