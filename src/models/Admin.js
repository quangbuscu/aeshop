module.exports = {

    getAdmin(con, [email, password], callback) {
        con.query('SELECT * FROM aeshop.admin WHERE email = ? and password = ?', [email, password], callback)
    },

}