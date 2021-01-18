const express = require('express')
const router = express.Router()

const igdb = require('../../controllers/igdb')


router.get('/homepagedata', igdb.homepage)
router.get('/gamepagedata', igdb.gamepage)
// router.get('/1', function(req, res) {
//     res.send('hello')
// })



module.exports = router