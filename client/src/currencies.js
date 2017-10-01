
export class Currencies {

  static formatMoneyFor (amount, currency) {
    for (var i = 0; i < this.list().length; i++) {
      let cur = this.list()[i]
      if (cur.code === currency) {
        let c = cur.decimals
        let d = this.translateSeparator(cur.decimal_separator)
        let t = this.translateSeparator(cur.thousand_separator)
        if (cur.symbolOnLeft === true) {
          return cur.symbol + ' ' + this.formatMoney(amount, c, d, t)
        } else {
          return this.formatMoney(amount, c, d, t) + ' ' + cur.symbol
        }
      }
    }
    return 'currency not found'
  }

  static formatMoney (n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c
    d = d === undefined ? '.' : d
    t = t === undefined ? ',' : t
    let s = n < 0 ? '-' : ''
    let i
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
    let j = (j = i.length) > 3 ? j % 3 : 0
    return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '')
  }

  static translateSeparator (str) {
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
  }

  static unFormatMoney (n, c, d, t) {
    let n2 = n.replace(' ', '')
    let n3 = n2.replace(d, '.')
    let n4 = n3.replace(t, '')
    return Number(n4)
  }

  static unFormatMoneyFor (amount, currency) {
    for (var i = 0; i < this.list().length; i++) {
      let cur = this.list()[i]
      if (cur.code === currency) {
        let c = cur.decimals
        let d = this.translateSeparator(cur.decimal_separator)
        let t = this.translateSeparator(cur.thousand_separator)
        return this.unFormatMoney(amount, c, d, t)
      }
    }
    return 'currency not found'
  }

  static list () {
    return [
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
        'symbolOnLeft': false,
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
}
