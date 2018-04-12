const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 10
  },
  status: {
    type: String,
    default: 'registered'
  },
  roles: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', UserSchema)
module.exports = User
