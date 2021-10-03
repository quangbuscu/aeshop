const jwt = require('jsonwebtoken')
const User = require('../models/User')
/**
 * Class User Controller
 */
class LoginController {

  login(req, res) {
    const data = {
      id_user: req.body.id_user,
      password: req.body.password,
      login_type: req.body.login_type,
      name: req.body.name,
      avatar: req.body.avatar,
    }

    const token = jwt.sign({data}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2d'})

    if (!data.id_user || !data.login_type) {
      const api = {
        error_code: 400,
        message: 'failed',
        data: {},
        err: {},
      }

      return res.json({api})
    }
    if (data.login_type === "FACEBOOK" || data.login_type === "GOOGLE") {
      User.Login(req.con, [data.id_user], (err, result) => {
        if (err) {
          const api = {
            error_code: 400,
            message: 'failed',
            data: {},
            err: err,
          }
          return res.json({api})
        }
        if (result[0]) {
          const api = {
            error_code: 200,
            message: 'success',
            data: result[0],
            err: {},
            token: token
          }
          return res.json({api})
        } else {
          User.RegisterOrther(req.con, [data.id_user, data.name, data.avatar], (err, result) => {
            if (err) {
              const api = {
                error_code: 400,
                message: 'failed',
                data: {},
                err: err,
                token: ''
              }
              return res.json({api})
            }
            if (result) {
              const api = {
                error_code: 200,
                message: 'success',
                data: result,
                err: {},
                token: token
              }
              return res.json({api})
            }
          })
        }
      })
    }
    else if (data.login_type === "PHONENUMBER") {
      User.LoginPhoneNumber(req.con, [data.id_user, data.password], (err, result) => {
        if (err) {
          const api = {
            error_code: 400,
            message: 'failed',
            data: {},
            err: err,
            token: ''
          }
          return res.json({api})
        }
        if (result) {
          if (result[0]) {
            const api = {
              error_code: 200,
              message: 'success',
              data: result[0],
              err: {},
              token: token,
            }
            return res.json({api})
          } else {
            const api = {
              error_code: 400,
              message: 'failed',
              data: {},
              err: {
                error_message: "ACCOUNT_DOES_NOT_EXIST"
              },
              token: '',
            }
            return res.json({api})
          }
        }
      })
    }
    else {
      const api = {
        error_code: 400,
        message: 'failed',
        data: {},
        err: {
          error_message: "ACCOUNT_DOES_NOT_EXIST"
        },
        token: '',
      }
      return res.json({api})
    }

  }

  register(req, res) {
    const pass = jwt.sign({password: req.body.password}, process.env.ACCESS_TOKEN_SECRET)
    const data = {
      id_user: req.body.id_user,
      name: req.body.name,
      password: pass,
    }
    User.Register(req.con, [data.id_user, data.name, data.password], (err, result) => {
      if (err) {
        const api = {
          error_code: 400,
          message: 'failed',
          data: {},
          err: err,
          token: '',
        }
        return res.json({api})
      }
      if (result) {
        api.message = 'success';
        api.error_code = 200;
        api.data = data;
        return res.json({api})
      }
    })
  }

}

module.exports = LoginController;
