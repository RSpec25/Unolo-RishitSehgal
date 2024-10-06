const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const auth = async (req,res,next) => {
    const token = req.header('Authorisation');
    if(!token){
        return res.status(401).json({
            Msg: "Authentication required!"
        })
    }
    try {
        const adminDecode = jwt.verify(token,secret);
        req.admin = adminDecode;
        next();
    } catch (e) {
        console.log("Error in Authmiddleware:",e);
        res.status(401).json({
            Error: "Invalid Token"
        })
    }
}

module.exports = auth