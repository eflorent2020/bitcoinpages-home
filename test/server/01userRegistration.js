/* global it */
/* global describe */
/* global after */
/* global before */

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server/server.js')
const should = chai.should()

should.should.be.equal(should) // lint

const Users = require('../../server/model/users')

chai.use(chaiHttp)

describe('Api Registration HTTP calls', () => {
  let testEmail = 'me@privacy.net'
  let testPassword = 'test' + Math.ceil(Math.random() * 1000000)

  describe('/POST /api/auth/register', () => {
    before(done => {
      Users.deleteUserByMail(testEmail, function () {})
      Users.deleteUserByMail(testEmail + '@ZZZ', done)
    })

    it('should report mail error', (done) => {
      const postData = {
        email: testEmail + '@ZZZ',
        nickName: 'tester',
        fullName: 'Test Test',
        password: testPassword
      }
      chai.request(server)
        .post('/api/auth/register')
        .type('form')
        .send(postData)
        .end((err, res) => {
          err.should.not.be.equal(null)
          res.should.have.status(500)
          done()
        })
    })

    it('should not create record for unsent registrations', (done) => {
      Users.getUserByMail(testEmail + '@ZZZ', function (err, result) {
        if (err) {
          err.should.be.equal(null)
        }
        result.length.should.be.equal(0)
        done()
      })
    })

    it('should register via post', (done) => {
      const testPassword = 'test' + Math.ceil(Math.random() * 1000000)
      const postData = {
        email: testEmail,
        nickName: 'tester',
        fullName: 'Test Test',
        password: testPassword
      }
      chai.request(server)
        .post('/api/auth/register')
        .type('form')
        .send(postData)
        .end((err, res) => {
          if (err) {
            err.should.be.equal(null)
          }
          res.should.have.status(200)
          res.body.success.should.be.equal(true)
          done()
        })
    }).timeout(10000)

    it('should not register twice', (done) => {
      const testPassword = 'test' + Math.ceil(Math.random() * 1000000)
      const postData = {
        email: testEmail,
        nickName: 'tester',
        fullName: 'Test Test',
        password: testPassword
      }
      chai.request(server)
        .post('/api/auth/register')
        .type('form')
        .send(postData)
        .end((err, res) => {
          err.should.be.not.be.equal(null)
          res.should.have.status(400)
          done()
        })
    })

    it('stored user should be well formed', (done) => {
      Users.getUserByMail(testEmail, function (err, result) {
        if (err) {
          err.should.be.equal(null)
        }
        result.length.should.be.equal(1)
        let user = result[0]
        user.nickname.should.be.equal('tester')
        user.fullname.should.be.equal('Test Test')
        // user.entreprise_id.should.be.a('number')
        user.email.should.be.equal(testEmail)
        // user.lang.should.be.a('string')
        // user.timezone.should.be.a('string')
        // user.xmpp_password.should.be.a('string')
        // user.verified_email.should.be.equal(null)
        // user.verified_token.should.be.a('string')
        // user.currency.should.be.a('string')
        // user.active.should.be.equal(false)
        done()
      })
    })

    after(done => {
      Users.deleteUserByMail(testEmail, function () {})
      Users.deleteUserByMail(testEmail + '@ZZZ', done)
    })
  })
})
