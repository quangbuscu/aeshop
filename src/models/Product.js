module.exports = {

    getProduct(con, username, callback) {
      con.query('SELECT * FROM ex1.admin WHERE username = admin?',
    //   username,
       callback)
    },

  }