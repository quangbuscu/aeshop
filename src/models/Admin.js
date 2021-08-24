module.exports = {

    getAdmin(con, username, callback) {
      con.query('SELECT * FROM ex1.admin WHERE username = ?',username, callback)
    },

  }