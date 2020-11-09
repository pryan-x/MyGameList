const express = require('express')
const router = express.Router()
const db = require('../../db')

// router.get('/', function(req, res) {
//     res.send('hello')
// })
// router.get('/1', function(req, res) {
//     res.send('hello')
// })

router.get('/', (req, res) => {
    db.select().from('test').then((data) => {
        res.send(data)
        // const { password username } = req.body
    })
})

module.exports = router