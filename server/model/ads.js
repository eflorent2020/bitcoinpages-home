var db = require('../dbconnection')

var Ads = {
  getAds: function (categoryId, lat, lng, offset, limit, callback) {
    if (categoryId > 0) {
      return db.query('select p.id,p.slug,p.feature_image,a.category,country,administrative_area,' +
        'locality,p.title,a.price,a.currency ,SUBSTRING(p.plaintext,1,200) as plaintext,ST_Distance(Point(?, ?),location) as dist ' +
        'from pcast_ads a,ghost.posts p where  p.id=a.post_id ' +
        ' and status="published" ' +
        ' and (category= ? ' +
        ' or category in (select id from pcast_categories where parent= ? )) order by a.id desc', [lat, lng, categoryId, categoryId], callback)
    } else {
      return db.query('select p.id,p.slug,p.feature_image,a.category,country,administrative_area,' +
        'locality,p.title,a.price,a.currency, SUBSTRING(p.plaintext,1,200) as plaintext ,ST_Distance(Point( ?, ? ),location) as dist ' +
        'from pcast_ads a,ghost.posts p, pcast_categories c where  p.id=a.post_id ' +
        ' and status="published" and a.category=c.id and c.over18=0 ' +
        ' order by a.id desc', [lat, lng], callback)
    }
  },
  getAdBySlug: function (slug, callback) {
    var sql = 'select notification,a.price,a.currency,category,custom_fields,country, ' +
      ' administrative_area,locality, group_concat(filename separator \',\') as images ' +
      ' from ghost.posts p,pcast_ads a,pcast_files i ' +
      ' where p.slug= ? and a.post_id=p.id and i.ad_id=a.id ' +
      ' group by a.id,a.price,a.currency,a.category,a.custom_fields,a.country,' +
      ' a.administrative_area,a.locality,a.notification'
    return db.query(sql, [slug], callback)
  }
}

module.exports = Ads
