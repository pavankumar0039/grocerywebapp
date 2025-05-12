const jwt = require('jsonwebtoken');

exports.userauth = function (req, res, next) {
    try {
        
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Please login",
            });
        }
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
       
        res.status(401).json({
            message: "Invalid or expired token. Please login again.",
        });
    }
};
