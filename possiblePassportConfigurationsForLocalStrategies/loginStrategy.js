const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const db = require('./db')
const { findUserByName } = require('./queries')

const loginStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, (username, password, done) => {
    try {
      db.query(findUserByName(username), async (error, results) => {
        if (error) {
          throw error
        }
        
        // if (results.rows.length > 0) {
        if (results.rows[0]) {
          
          const user = results.rows[0]

          if (await bcrypt.compare(password, user.password)) {
            console.log('logged in')
            return done(null, user)
          } else {
            return done(null, false, { message: 'Invalid Username or Password' })
          }
        } else {
          return done(null, false, { message: 'Invalid Username or Password' })
        }
      })
    } catch (error) {
      console.log( `You made it to the ${signUp.name} controller, but there was an error:\n\t${error}`)
      return done(error)
    }
  })

module.exports = loginStrategy