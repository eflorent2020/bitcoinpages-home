var db = require('../dbconnection')

var AdsLocation = {
  getAdsLocations: function (callback) {
    return db.query('select distinct country,administrative_area,locality from pcast_ads order by country,administrative_area,locality', callback)
  }
}

module.exports = AdsLocation
