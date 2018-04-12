const Controller = require('./Controller')
const UserResponse = require('../responses/UserResponse')
const User = require('../models/User')

class UserController extends Controller {
  static get (req, res) {
    User.find()
      .then(users => {
        res.json(UserResponse.all(users))
      })
  }
}

module.exports = UserController
