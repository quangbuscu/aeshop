const jwt = require('jsonwebtoken')
require('dotenv').config();

function verifyToken(req, res, next) {
    var token = req.cookies.token;
    console.log("ACBC",token)
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            if (err) {
                console.log('ERROR',err)
                req.flash('message', 'Hết hạn đăng nhập!')
                res.redirect('/',)
            }
            if (decoded){
                console.log(decoded.email);
                const newToken = jwt.sign({email:decoded.email}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:300});
                console.log('TOKEN',newToken)
                res.cookie('token', newToken)
                next();
            }
        });
    }
}

module.exports = {
    verifyToken: verifyToken,
};
