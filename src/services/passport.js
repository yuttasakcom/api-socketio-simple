const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false
},
(req, email, password, done) => {
  User.findOne({ 'email': email })
    .then(user => {
      if (user) {
        done({status: 422, message: 'That email is already taken.'})
        return
      }

      const newUser = new User()
      const dateNow = Date.now()
      newUser.email = email
      newUser.password = newUser.generateHash(password)
      newUser.createdAt = dateNow
      newUser.updatedAt = dateNow
      newUser.save()
        .then(data => done(null, data))
        .catch(err => done(err))
    })
    .catch(err => done(err))
}))
