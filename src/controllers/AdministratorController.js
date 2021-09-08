const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')


// const db = require(`../models/index.js`);
/**
 * Class Auth Controller
 */
class AdministratorController {
    getInfo(req, res) {
        res.render('administrator');
    }
}

module.exports = AdministratorController;