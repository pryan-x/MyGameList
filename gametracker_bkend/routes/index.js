const express = require('express')
const router = express.Router()
const userRoute = require('./api/user')

const auth = require('../controllers/auth')
// const signUp = require('../controllers/auth/signUp')
// const login = require('../controllers/auth/login')

//everything here uses {PORT}/api
//the /user is {PORT}/api/user
//can do {PORT}/user/1 in the user.js

//AUTH
router.post('/signup', auth.signUp)
router.post('/login', auth.login)
//0AUTH TO BE ADDED


//RESTRICTED ROUTES
router.use('/user', userRoute)

module.exports = router