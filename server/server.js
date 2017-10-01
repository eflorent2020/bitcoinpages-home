const protect = require('@risingstack/protect')
const express = require('express')
const path = require('path')
const parentApp = express()
const bodyParser = require('body-parser')

parentApp.set('port', (process.env.VIRTUAL_PORT || 2368))

parentApp.use(bodyParser.json({
  extended: false
}))

parentApp.use(protect.express.sqlInjection({
  body: true,
  loggerFunction: console.error
}))

parentApp.use(protect.express.xss({
  body: true,
  loggerFunction: console.error
}))

var routes = require('./router.js')
parentApp.use('/api', routes.getRoutes(parentApp))

parentApp.use(express.static(path.join(process.cwd(), '/client/dist')))
parentApp.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
})

if (process.env.NODE_ENV !== 'test') {
  const ghost = require('ghost')
  const utils = require('../node_modules/ghost/core/server/utils')
  ghost().then(function (ghostServer) {
    parentApp.use(utils.url.getSubdir(), ghostServer.rootApp)
    ghostServer.start(parentApp)
  })
}

module.exports = parentApp
