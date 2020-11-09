const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const db = require('./db')
const { findUserByName, findUserById } = require('./queries')


function initialize(passport) {
  const authenticateUser = (username, password, done) => {
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
      console.log(error)
      return done(error)
    }
  }

  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      authenticateUser
    )
  )

  passport.serializeUser((user, done) => done(null, user.id))

  passport.deserializeUser((id, done) => {
    db.query(findUserById(id), (error, results) => {
      if (error) {
        return done(error)
      }
      console.log('user is results: ', results)
      console.log(`ID is ${results.rows[0].id}`)
      return done(null, results.rows[0])
    })
  })
}

module.exports = initialize



// function initialize(passport) {
//   console.log("Initialized")

//   const authenticateUser = (username, password, done) => {
//     console.log(username, password)

//     db.query(findUserByName(username), (error, results) => {
//         if (error) {
//           throw error
//         }

//         console.log(results)
//         console.log(results.rows)
//         console.log(results.rows[0] === true)
//         console.log(results.rows[0] === false)

//         if (results.rows.length > 0) {
//           const user = results.rows[0]
//           // try {
//           await bcrypt.compare(password, user.password, (error, isMatch) => {
//             if (error) {
//               throw error
//             }
//             if (isMatch) {
//               return done(null, user)
//             } else {
//               //password is incorrect
//               return done(null, false, { message: "Password is incorrect" })
//             }
//           })
//         } else {
//           // No user
//           return done(null, false, {
//             message: "No user with that username "
//           })
//         }
//       }
//     )
//   }

//   passport.use(
//     new LocalStrategy(
//       { usernameField: "username", passwordField: "password" },
//       authenticateUser
//     )
//   )
//   // Stores user details inside session. serializeUser determines which data of the user
//   // object should be stored in the session. The result of the serializeUser method is attached
//   // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
//   //   the user id as the key) req.session.passport.user = {id: 'xyz'}
//   passport.serializeUser((user, done) => done(null, user.id))

//   // In deserializeUser that key is matched with the in memory array / database or any data resource.
//   // The fetched object is attached to the request object as req.user

//   passport.deserializeUser((id, done) => {
//     db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, results) => {
//       if (error) {
//         return done(error)
//       }
//       console.log(`ID is ${results.rows[0].id}`)
//       return done(null, results.rows[0])
//     })
//   })
// }

// module.exports = initialize