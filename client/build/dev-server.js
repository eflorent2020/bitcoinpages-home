require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

var ghost = require('ghost');
var path = require('path');
var utils = require('../../node_modules/ghost/core/server/utils');
var port = process.env.VIRTUAL_PORT || config.dev.port
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var proxyTable = config.dev.proxyTable
var parentApp = express()
var compiler = webpack(webpackConfig)
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var routes = require('../../server/router');

ghost().then(function (ghostServer) {
    parentApp.use(utils.url.getSubdir(), ghostServer.rootApp);
    parentApp.use('/api', routes.getRoutes(parentApp));
    
    // serve static 
    var stat = path.join(process.cwd(), '/client/src/assets');
    parentApp.use('/static', express.static(stat));    

    var devMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      quiet: true
    })

    var hotMiddleware = require('webpack-hot-middleware')(compiler, {
      log: false,
      heartbeat: 2000
    })
    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
      })
    })

    // proxy api requests
    Object.keys(proxyTable).forEach(function (context) {
      var options = proxyTable[context]
      if (typeof options === 'string') {
        options = { target: options }
      }
      parentApp.use(proxyMiddleware(options.filter || context, options))
    })

    // handle fallback for HTML5 history API
    parentApp.use(require('connect-history-api-fallback')())

    // serve webpack bundle output
    parentApp.use(devMiddleware)

    // enable hot-reload and state-preserving
    // compilation error display
    parentApp.use(hotMiddleware)

    var uri = 'http://localhost:' + port

    console.log('> Starting dev server...')
    devMiddleware.waitUntilValid(() => {
      console.log('> Listening at ' + uri + '\n')
      // when env is testing, don't need open it
      if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
      }
       _resolve()
    })

    var server = parentApp.listen(port)

});

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

module.exports = {
  ready: readyPromise,
    close: () => {
      server.close()
    }
}