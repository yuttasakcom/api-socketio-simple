const mongoose = require('mongoose')
const faker = require('faker')
const dotenv = require('dotenv')

dotenv.config('../../../.env')

const mongodb = process.env.MONGO_HOST || 'mongodb://localhost:27017/apis'
mongoose.Promise = global.Promise
mongoose.connect(mongodb)

const User = require('../../models/User')

for (let i = 0; i < 10; i++) {
  const user = new User()
  user.email = faker.internet.email()
  user.password = user.generateHash('0123456789')
  user.createdAt = Date.now()
  user.updatedAt = Date.now()
  user.save()
}

console.log('Success')
