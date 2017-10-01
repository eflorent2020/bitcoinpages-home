/* global it */
/* global describe */
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server/server.js')

chai.use(chaiHttp)

describe('Environnement variables', () => {
  it('should have required email variables', (done) => {
    process.env.EMAIL_SERVICE.should.be.a('string')
    process.env.EMAIL.should.be.a('string')
    process.env.EMAIL_PASSWORD.should.be.a('string')
    done()
  })

  it('should have required database', (done) => {
    process.env.MYSQL_USER.should.be.a('string')
    process.env.MYSQL_PASSWORD.should.be.a('string')
    process.env.MYSQL_DB.should.be.a('string')
    process.env.MYSQL_PASSWORD.should.be.a('string')
    done()
  })

  it('should have required entreprise variables', (done) => {
    process.env.ENTREPRISE_ID.should.be.a('string')
    process.env.PRIVATE_IP.should.be.a('string')
    done()
  })

  it('should decode variables from REST API', (done) => {
    chai.request(server)
      .get('/api/entreprise/')
      .end((err, res) => {
        if (err) {
          err.should.be.equal(null)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        let gkey = res.body.GKEY
        gkey.should.equal(process.env.GKEY)
        done()
      })
  })
})
