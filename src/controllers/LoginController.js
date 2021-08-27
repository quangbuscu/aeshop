const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')


// const db = require(`../models/index.js`);
/**
 * Class Auth Controller
 */
class LoginController {
  login(req, res) {
    res.render('login', { layout: false, message: req.flash('message') });
  }

    loginFinal(req, res) {
    Admin.getAdmin(req.con, req.body.username, (err, result) => {
      try {
        const token = jwt.sign({ username: req.body.username }, req.body.password);
        if (token === jwt.sign({ username: result[0].username }, result[0].password)) {
          res.cookie('token', token);
          res.render('home');
        } else {
          req.flash('message', 'Sai tài khoản hoặc mật khẩu!')
          res.redirect('login');
        }
      } catch (error) {
        req.flash('message', 'Sai tài khoản hoặc mật khẩu!')
        res.redirect('login');
      }
    })

  }
}

module.exports = LoginController;
