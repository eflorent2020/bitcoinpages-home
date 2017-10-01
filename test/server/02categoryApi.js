/* global it */
/* global describe */

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server/server.js')

chai.use(chaiHttp)

describe('Api Categories HTTP calls', () => {
  describe('/GET /api/categories', () => {
    it('should get all the categories', (done) => {
      chai.request(server)
      .get('/api/categories/')
      .end((err, res) => {
        if (err) {
          err.should.be.equal(null)
        }
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.id.should.equal(0)
        res.body.name.should.be.a('string')
        res.body.children.should.be.a('array')
        done()
      })
    })
  })

  describe('/GET /api/category/:id', () => {
    it('should get one category', (done) => {
      chai.request(server)
        .get('/api/category/1')
        .end((err, res) => {
          if (err) {
            err.should.be.equal(null)
          }
          res.should.have.status(200)
          res.body.should.be.a('array')
          let aCat = res.body[0]
          aCat.parent.should.equal(0)
          aCat.title.should.be.a('string')
          aCat.id.should.equal(1)
          done()
        })
    })
  })

  describe('/GET /api/category/p/:id', () => {
    it('should get several categories by parent', (done) => {
      chai.request(server)
        .get('/api/category/p/1')
        .end((err, res) => {
          if (err) {
            err.should.be.equal(null)
          }
          res.should.have.status(200)
          res.body.should.be.a('array')
          let aCat = res.body[0]
          aCat.parent.should.equal(1)
          aCat.title.should.be.a('string')
          aCat.id.should.be.a('number')
          done()
        })
    })
  })
})
