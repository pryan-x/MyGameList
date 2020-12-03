const express = require('express')
const router = express.Router()

const auth = require('../../controllers/auth')

//AUTH ROUTES
router.post('/signup', auth.signUp)
router.post('/login', auth.login)

//0AUTH TO BE ADDED


module.exports = router