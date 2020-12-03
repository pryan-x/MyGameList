const express = require('express')
const router = express.Router()

const igdb = require('../../controllers/igdb')


router.get('/homepagedata', igdb.homepage)
// router.get('/1', function(req, res) {
//     res.send('hello')
// })



module.exports = router