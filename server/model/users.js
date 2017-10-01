var db = require('../dbconnection')

var Users = {
  getUserByMail: function (email, callback) {
    var sql = 'SELECT id, nickname, fullname, entreprise_id, email, password, currency, xmpp_password, ' +
    ' verified_email, verify_token, currency, active, lang ' +
        'FROM pcast_users where email = ?'
    return db.query(sql, [email], callback)
  },
  getUserById: function (id, callback) {
    var sql = 'SELECT id, nickname, fullname, entreprise_id, email, password, ' +
        'currency, xmpp_password, verified_email, verify_token ' +
        'FROM pcast_users where id= ?'
    return db.query(sql, [id], callback)
  },
  createUser: function (email, nickname, fullname, password, verifyToken, callback) {
    var sql = 'INSERT INTO pcast_users (email,nickname,fullname,password,verify_token) ' +
    ' VALUES (?, ?, ?, ?, ?)'
    return db.query(sql, [ email, nickname, fullname, password, verifyToken ], callback)
  },
  setUserEmailVerified: function (id, callback) {
    var sql = 'UPDATE pcast_users SET verified_email = TRUE WHERE id = ?'
    return db.query(sql, id, callback)
  },
  // for tests & cleanup/recover on mail error
  deleteUserByMail: function (email, callback) {
    var sql = 'DELETE FROM pcast_users WHERE email = ?'
    return db.query(sql, [email], callback)
  }
}

module.exports = Users
