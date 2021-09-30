const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const cookieParser = require('cookie-parser')
const e = require("express");
// const db = require(`../models/index.js`);
/**
 * Class Auth Controller
 */
class LoginController {
    login(req, res) {
        res.render('login', { layout: false, message: req.flash('message') });
    }

    loginFinal(req, res) {
        console.log(req);
        Admin.getAdmin(req.con, [req.body.username, req.body.password],
            (err, result) => {
            if (err) throw err;

            if (result[0] == undefined || result[0] == null) {
                req.flash('message', 'Sai tài khoản hoặc mật khẩu!')
                return res.redirect('/');
            } else {
                const token = jwt.sign({ email: result[0].email }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'2d'});
                console.log('TOKEN',token)
                res.cookie('token', token)
                return res.render('home');
            }

        })

    }
}

module.exports = LoginController;
