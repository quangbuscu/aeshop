module.exports = {

    Register(con, [id_user, name, password], callback) {
        con.query('INSERT INTO aeshop.user(id_user,name,password) VALUES(?,?,?);', [id_user, name, password], callback)
    },

    RegisterOrther(con, [id_user, name, avatar], callback) {
        con.query('INSERT INTO aeshop.user(id_user,name,avatar) VALUES(?,?,?);', [id_user, name, avatar], callback)
    },

    LoginPhoneNumber(con, [id_user, password], callback) {
        con.query('SELECT * FROM aeshop.user WHERE id_user = ? AND password = ?', [id_user, password], callback)
    },
    Login(con, [id_user], callback) {
        con.query('SELECT * FROM aeshop.user WHERE id_user = ?', [id_user], callback)
    },


}