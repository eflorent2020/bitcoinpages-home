var db = require('../dbconnection')

var Category = {
  getCategories: function (callback) {
    return db.query('Select id,parent,title from polycaste.pcast_categories where id in (select id from active_categories) order by parent', callback)
  },
  getCategoryById: function (id, callback) {
    return db.query('select id,parent,title from polycaste.pcast_categories where id=?', [id], callback)
  },
  getCategoryByParentId: function (id, callback) {
    return db.query('select id,parent,title from polycaste.pcast_categories where parent=? and id in (select id from active_categories)', [id], callback)
  }
}

module.exports = Category
