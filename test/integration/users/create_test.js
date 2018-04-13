/* global describe it */

const assert = require('assert')
const requrest = require('supertest')
const faker = require('faker')
const server = require('../../../src/server')

describe('Integration Test', () => {
  it('handles a POST request to /api/users', done => {
    const fakeEmail = faker.internet.email().toLowerCase()
    requrest(server)
      .post('/api/users')
      .send({
        email: fakeEmail,
        password: '0123456789'
      })
      .end((_, res) => {
        const { email, status, password } = res.body.data
        assert(email === fakeEmail)
        assert(status === 'registered')
        assert(password === undefined)
        done()
      })
  })
})
