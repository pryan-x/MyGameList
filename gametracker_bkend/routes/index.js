const express = require('express')
const router = express.Router()

//authroute
const authRoute = require('./api/auth')

const userRoute = require('./api/user')

//ext api route
const igdbRoute = require('./igdb')

// authorization function that continues to the request 
// when JWT is authorized from header

// const checkAuthorization = require('../helpers/authenticate')


// //AUTH
// const auth = require('../controllers/auth')
// router.post('/signup', auth.signUp)
// router.post('/login', auth.login)
// //0AUTH TO BE ADDED


//AUTH ROUTES
router.use('/auth', authRoute)

//RESTRICTED ROUTES
router.use('/user', userRoute)


//EXTERNAL API ROUTES
router.use('/igdb', igdbRoute)

module.exports = router