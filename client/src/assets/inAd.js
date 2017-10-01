(function () {
  var app = {
    slug: '',
    adInfo: {},
    init: function () {
      this.slug = this.getSlug()
      this.getPostInfo()
    },
    getSlug: function () {
      var l = window.location.pathname.split('/')
      return l[l.length - 2]
    },
    errorInAd: function (msg) {
      console.log(msg)
    },
    getPostInfo: function () {
      var url = '/api/adBySlug/' + this.slug
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', url)
      xhr.onload = function () {
        try {
          var result = JSON.parse(xhr.responseText)
        } catch (e) {
          // console.log(e)
        }
        if (result && result.length === 1) {
          self.adInfo = result[0]
          self.buildPrice()
          self.buildContactLink()
          self.buildCustomFields()
          var div = document.createElement('div')
          var art = document.getElementsByTagName('article')[0]
          art.append(div)
          self.buildGallery()
        } else {
          console.log('inconsistent ad description for ' + this.slug)
        }
      }
      xhr.send()
    },
    guessColNum: function () {
      var cols = 3
      var w = window
      var d = document
      var e = d.documentElement
      var g = d.getElementsByTagName('body')[0]
      var x = w.innerWidth || e.clientWidth || g.clientWidth
      // var y = w.innerHeight || e.clientHeight || g.clientHeight
      if (x < 769) {
        cols = 2
      }
      if (x < 481) {
        cols = 1
      }
      // default to 3
      return cols
    },
    buildPrice: function () {
      var art = document.getElementsByTagName('article')[0]
      var rootElem = document.createElement('div')
      rootElem.className = 'price'
      rootElem.innerHTML = ' ' + this.formatMoneyFor(this.adInfo.price, this.adInfo.currency)
      art.appendChild(rootElem)
    },
    buildContactLink: function () {
      var art = document.getElementsByTagName('article')[0]
      var rootElem = document.createElement('div')
      rootElem.className = 'contact'
      if (this.adInfo.notification.startsWith('http')) {
        rootElem.innerHTML = '<a href="' + this.adInfo.notification + '">contact</a>'
      } else {
        rootElem.innerHTML = '<a class="gh-btn gh-btn-green" href="/#message/' +
        this.adInfo.notification + '/' + this.slug + '">contact</a>'
      }
      art.appendChild(rootElem)
    },
    buildCustomFields: function () {
      var fields = null
      try {
        fields = JSON.parse(this.adInfo.custom_fields)
      } catch (e) {
        console.log(e)
      }
      if (fields) {
        var art = document.getElementsByTagName('article')[0]
        var rootElem = document.createElement('div')
        rootElem.className = 'customFields'
        art.appendChild(rootElem)
        for (var key in fields) {
          if (fields.hasOwnProperty(key)) {
            this.buildCustomField(rootElem, key, fields[key])
          }
        }
      }
    },
    buildCustomField: function (rootElem, key, value) {
      var fK = document.createElement('span')
      fK.className = 'customField'
      fK.innerHTML = key
      rootElem.append(fK)
      var fV = document.createElement('span')
      fV.className = 'customValue'
      fV.innerHTML = value
      rootElem.append(fV)
    },
    buildGallery: function () {
      var rootElem = document.getElementsByTagName('article')[0]
      var ct = this.guessColNum()
      for (var i = 0; i < ct; i++) {
        var c = document.createElement('div')
        c.setAttribute('id', 'col_' + i)
        c.className = 'gallery_col'
        c.style.width = (Math.ceil(100 / ct) - 1) + '%'
        rootElem.append(c)
      }
      this.create_columns(ct)
      var images = this.adInfo.images.split(',')
      for (var j = 0; j < images.length; j++) {
        var image = document.createElement('img')
        image.setAttribute('src', images[j])
        this.addImage(image)
      }
    },
    addImage: function (elem) {
      var column = this.get_min_column()
      this.add_column_elem(column, elem)
    },
    get_min_column: function () {
      var minHeight = Infinity
      var minI = -1
      for (var i = 0; i < this.HEIGHTS.length; ++i) {
        if (this.HEIGHTS[i] < minHeight) {
          minHeight = this.HEIGHTS[i]
          minI = i
        }
      }
      return minI
    },
    add_column_elem: function (index, elem) {
      var col = document.getElementById('col_' + index)
      col.appendChild(elem)
      this.HEIGHTS[index] = this.HEIGHTS[index] + col.scrollHeight
    },
    add_image: function (image) {
      var column = this.get_min_column()
      this.add_column_elem(document.getElementById('col_' + column), image, column)
    },
    create_columns: function (n) {
      this.HEIGHTS = []
      for (var i = 0; i < n; ++i) {
        this.HEIGHTS.push(0)
      }
    },
    formatMoneyFor: function (amount, currency) {
      for (var i = 0; i < this.currencies.length; i++) {
        var cur = this.currencies[i]
        if (cur.code === currency) {
          var c = cur.decimals
          var d = this.translateSeparator(cur.decimal_separator)
          var t = this.translateSeparator(cur.thousand_separator)
          if (cur.symbolOnLeft === true) {
            return cur.symbol + ' ' + this.formatMoney(amount, c, d, t)
          } else {
            return this.formatMoney(amount, c, d, t) + ' ' + cur.symbol
          }
        }
      }
      return 'currency not found'
    },
    formatMoney: function (n, c, d, t) {
      c = isNaN(c = Math.abs(c)) ? 2 : c
      d = d === undefined ? '.' : d
      t = t === undefined ? ',' : t
      var s = n < 0 ? '-' : ''
      var i
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
      var j = (j = i.length) > 3 ? j % 3 : 0
      return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '')
    },
    translateSeparator: function (str) {
      switch (str) {
        case 'COMMA':
          return ','
        case 'SPACE':
          return ' '
        case 'PERIOD':
          return '.'
        default:
          return ','
      }
    },
    currencies: [
      {
        'symbolOnLeft': true,
        'code': 'USD',
        'name': 'United States dollar',
        'symbol': '$',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'EUR',
        'name': 'Euro',
        'symbol': '\u20ac',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'code': 'JPY',
        'name': 'Japanese yen',
        'symbol': '\u00a5',
        'decimals': '0',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'BGN',
        'name': 'Bulgarian lev',
        'symbol': '\u043b\u0432',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'CZK',
        'name': 'Czech koruna',
        'symbol': 'K\u010d',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'code': 'DKK',
        'name': 'Danish krone',
        'symbol': 'kr',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'symbolOnLeft': true,
        'code': 'GBP',
        'name': 'Pound sterling',
        'symbol': '\u00a3',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'HUF',
        'name': 'Hungarian forint',
        'symbol': 'Ft',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'code': 'PLN',
        'name': 'Polish z\u0142oty',
        'symbol': 'z\u0142',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'code': 'RON',
        'name': 'Romanian new leu',
        'symbol': 'lei',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'code': 'SEK',
        'name': 'Swedish krona',
        'symbol': 'kr',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'code': 'CHF',
        'name': 'Swiss franc',
        'symbol': 'Fr.',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'code': 'NOK',
        'name': 'Norwegian krone',
        'symbol': 'kr',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'code': 'HRK',
        'name': 'Croatian kuna',
        'symbol': 'kn',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'code': 'RUB',
        'name': 'Russian rouble',
        'symbol': '\u0440\u0443\u0431',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'NONE'
      },
      {
        'code': 'TRY',
        'name': 'Turkish lira',
        'symbol': 'TL',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'code': 'AUD',
        'name': 'Australian dollar',
        'symbol': '$',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'BRL',
        'name': 'Brazilian real',
        'symbol': 'R$',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'code': 'CAD',
        'name': 'Canadian dollar',
        'symbol': '$',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'CNY',
        'name': 'Chinese yuan',
        'symbol': '\u00a5',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'HKD',
        'name': 'Hong Kong dollar',
        'symbol': '$',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'IDR',
        'name': 'Indonesian rupiah',
        'symbol': 'Rp',
        'decimals': '0',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      },
      {
        'code': 'INR',
        'name': 'Indian rupee',
        'symbol': 'IN\u20a8',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'KRW',
        'name': 'South Korean won',
        'symbol': '\u20a9',
        'decimals': '0',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'MXN',
        'name': 'Mexican peso',
        'symbol': '$',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'MYR',
        'name': 'Malaysian ringgit',
        'symbol': 'RM',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'NZD',
        'name': 'New Zealand dollar',
        'symbol': '$',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'PHP',
        'name': 'Philippine peso',
        'symbol': 'Php',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'SGD',
        'name': 'Singapore dollar',
        'symbol': 'S$',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'THB',
        'name': 'Thai baht',
        'symbol': '\u0e3f',
        'decimals': '2',
        'decimal_separator': 'PERIOD',
        'thousand_separator': 'COMMA'
      },
      {
        'code': 'ZAR',
        'name': 'South African rand',
        'symbol': 'R',
        'decimals': '2',
        'decimal_separator': 'COMMA',
        'thousand_separator': 'SPACE'
      }
    ]
  }
  app.init()
})()
