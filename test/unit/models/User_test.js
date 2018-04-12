/* global describe it */
const assert = require('assert')
const faker = require('faker')

const User = require('../../../src/models/User')

describe('Creating records', () => {
  it('save a user', done => {
    const user = new User({})
    const email = faker.internet.email().toLowerCase()
    user.email = email
    user.password = user.generateHash('0123456789')
    user.createdAt = Date.now()
    user.updatedAt = Date.now()
    user.save()
      .then(data => {
        assert(data.email === email)
        assert(data.validPassword('0123456789'))
        done()
      })
  })
})
