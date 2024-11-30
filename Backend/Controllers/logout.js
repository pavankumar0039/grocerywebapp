async function logout(req,res){
    res.clearCookie('token', {
        httpOnly: true, // Match the cookie properties
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // Match the sameSite property
    });

    res.status(200).json({ message: 'Logout successful. Cookie cleared.' });
}
module.exports=logout