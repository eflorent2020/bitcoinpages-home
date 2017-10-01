
module.exports = {

  getRoutes: function (app) {
    const express = require('express')
    const passport = require('passport')
    const router = express.Router()
    const jwt = require('jsonwebtoken')
    const randomstring = require('randomstring')
    const bcrypt = require('bcrypt')
    const nodemailer = require('nodemailer')
    const LocalStrategy = require('passport-local').Strategy
    const flash = require('connect-flash')
    const cors = require('cors')
    const bodyParser = require('body-parser')
    const Category = require('./model/category')
    const Users = require('./model/users')
    const Ads = require('./model/ads')
    const dotenv = require('dotenv')
    dotenv.config({path: '../.env'})

    process.env.EMAIL_SERVICE = dotenv.config().parsed.EMAIL_SERVICE
    process.env.EMAIL = dotenv.config().parsed.EMAIL
    process.env.EMAIL_PASSWORD = dotenv.config().parsed.EMAIL_PASSWORD
    process.env.ENTREPRISE_ID = dotenv.config().parsed.ENTREPRISE_ID

    app.use(flash())
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.set('jwtSecret', process.env.JWT_SECRET)
    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (username, password, done) {
      Users.getUserByMail(username, function (err, rows) {
        if (err) {
          return done('Problem reading credentials', false)
        } else {
          if (rows.length > 0) {
            let user = JSON.parse(JSON.stringify(rows[0]))
            if (user.verified_email === null || user.verified_email !== 1) {
              return done('Please verify your email first. Check your inbox for our verification email.', false)
            }
            bcrypt.compare(password, user.password, function (err, res) {
              if (err) {
                return done('bcrypt error', false)
              }
              if (res === true) {
                return done(null, user)
              } else {
                return done('Incorrect credentials', false)
              }
            })
          } else {
            return done('Incorrect credentials', false)
          }
        }
      })
    }))

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
      Users.getUserById(id, function (err, rows) {
        if (err) {
          return done('Problem reading credentials ' + err, false)
        } else {
          if (rows.length > 0) {
            let user = JSON.parse(JSON.stringify(rows[0]))
            done(null, user)
          } else {
            return done('Problem reading credentials', false)
          }
        }
      })
    })

    router.post('/auth/login', function (req, res, next) {
      passport.authenticate('local', function (err, user, info) {
        if (err) {
          return res.status(400).json({ error: err })
        } else {
          if (user) {
            user.password = null // clean up for jwt
            user.verified_email = null
            user.verify_token = null
            var token = jwt.sign(user, app.get('jwtSecret'))
            return res.json({ success: true, role: user.role, token: token })
          } else {
            return res.json({ success: false, message: info })
          }
        }
      })(req, res, next)
    })

    // NodeMailer config
    var transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    var sendActivationMail = function (to, fullName, id, token, callback) {
      var text = 'Hi ' + fullName + '!\n Welcome to https://www.bitcoinpage.org. \n' +
        'Please click the following link to verify your email.\n https://www.bitcoinpage.org/#verify/' + id + '/' + token + '\n\n'
      var mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: 'Bitcoinpage.org - Email Verification',
        text: text
      }
      transporter.sendMail(mailOptions, callback)
    }

    router.post('/auth/register', function (req, res, next) {
      const saltRounds = 10
      var randString = randomstring.generate({
        length: 12,
        charset: 'alphabetic'
      })
      const data = {
        email: req.body.email,
        nickName: req.body.nickName,
        fullName: req.body.fullName,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        verify_token: randString,
        role: 'regular'
      }
      // seek  for user
      Users.getUserByMail(data.email, function (err, result) {
        if (err) {
          console.err('ERR:' + err)
          return res.status(500).json({ success: false, data: err })
        }
        if (result && result.length > 0) {
          return res.status(400).json({ success: false, data: 'User already exists. Please try again.' })
        } else {
          // create user
          Users.createUser(data.email, data.nickName, data.fullName, data.password, data.verify_token, function (err, result) {
            if (err) {
              console.err('ERR:' + err)
              return res.status(500).json({ success: false, data: err })
            } else {
              // send activation email
              Users.getUserByMail(data.email, function (err, result) {
                if (err) {
                  console.err('ERR:' + err)
                  return res.status(500).json({ success: false, data: err })
                } else if (result && result.length > 0) {
                  sendActivationMail(data.email, data.fullName, result[0].id, data.verify_token, function (ko, ok) {
                    if (ko === null) {
                      return res.status(200).json({ success: true })
                    } else {
                      Users.deleteUserByMail(data.email)
                      return res.status(500).json({ success: false, data: ko })
                    }
                  })
                }
              })
            }
          })
        }
      })
    })

    router.get('/verify/:id/:token', function (req, res) {
      var id = req.params.id
      var token = req.params.token
      Users.getUserById(id, function (err, result) {
        if (err) {
          return res.status(500).json({ success: false, data: err })
        }
        if (result && result.length > 0) {
          if (result.token === token) {
            Users.setUserEmailVerified(id, function (err, result) {
              if (err) {
                return res.status(500).json({ success: false, data: err })
              }
              return res.json({ success: true, message: 'Email is now verified. Please login to get started!' })
            })
          }
        }
        return res.json({ success: false, data: 'something went wrong' })
      })
    })

    router.get('/entreprise/', function (req, res, next) {
      res.json({ GKEY: process.env.GKEY })
    })

    router.get('/adBySlug/:slug', function (req, res, next) {
      Ads.getAdBySlug(req.params.slug, function (err, rows) {
        if (err) {
          res.json(err)
        } else {
          res.json(rows)
        }
      })
    })

    router.get('/category/p/:id', function (req, res, next) {
      if (req.params.id) {
        Category.getCategoryByParentId(req.params.id, function (err, rows) {
          if (err) {
            res.json(err)
          } else {
            res.json(rows)
          }
        })
      } else {
        Category.getCategories(function (err, rows) {
          if (err) {
            res.json(err)
          } else {
            res.json(rows)
          }
        })
      }
    })

    router.get('/category/:id', function (req, res, next) {
      if (req.params.id) {
        Category.getCategoryById(req.params.id, function (err, rows) {
          if (err) {
            res.json(err)
          } else {
            res.json(rows)
          }
        })
      } else {
        Category.getCategories(function (err, rows) {
          if (err) {
            res.json(err)
          } else {
            res.json(rows)
          }
        })
      }
    })

    // Traverse data and build the tree
    function buildTree (arr, rootElement) {
      for (var i = 0; i < arr.length; i++) {
        var elem = newElem(arr[i])
        if (arr[i].parent === 0) {
          rootElement.children.push(elem)
          continue
        }
        var rootId = arr[i].parent
        var parent = getParent(rootElement, rootId)
        if (parent != null && parent.children != null) {
          parent.children.push(elem)
        }
      }
    }

    function getParent (rootNode, rootId) {
      if (rootNode.id === rootId) {
        return rootNode
      }
      for (var i = 0; i < rootNode.children.length; i++) {
        var child = rootNode.children[i]
        if (child.id === rootId) return child
        if (child.children.length > 0) {
          var childResult = getParent(child, rootId)
        }
        if (childResult != null) {
          return childResult
        }
      }
      return null
    }

    function newElem (row) {
      let elem = {}
      elem['id'] = row.id
      elem['name'] = row['title']
      elem['children'] = []
      return elem
    }

    router.get('/categories/', function (req, res, next) {
      Category.getCategories(function (err, rows) {
        if (err) {
          res.json(err)
        } else {
          var rootElement = {
            id: 0,
            name: 'category',
            children: []
          }
          // Get parent of node (recursive)
          buildTree(rows, rootElement)
          res.json(rootElement)
        }
      })
    })

    router.get('/ads/:categoryId/:lat/:lng/:offset/:limit', function (req, res, next) {
      Ads.getAds(req.params.categoryId, req.params.lat, req.params.lng, req.params.offset, req.params.limit, function (err, rows) {
        if (err) {
          res.json(err)
        } else {
          res.json(rows)
        }
      })
    })
    return router
  }
}
