const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TOKEN_KEY = process.env.TOKEN_KEY

const db = require('../../db')
const { findUserByName } = require('../../queries')

const login = (req, res) => {
    try {
        const { 
            username, 
            // email, 
            password 
        } = req.body

        db.query(findUserByName(username), async (error, results) => {
            if (error) {
                throw error
            }
            // if (results.rows.length > 0) {
            if (results.rows[0]) {
                const user = results.rows[0]
    
                if (await bcrypt.compare(password, user.password)) {
                    console.log('logged in')
                    const payload = {
                        id: user.id,
                        username: user.username,
                        // email: user.email
                    }

                    let userData = {
                        id: user.id,
                        username: user.username,
                    }
                    

                    const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '1d' })
                    return res.status(201).json({ user: userData, token })
                } else {
                    return res.status(400).json({ errors: ['Invalid Username or Password'] })
                }
            } else {
                return res.status(400).json({ errors: ['Invalid Username or Password'] })
            }
        })
        } catch (error) {
            console.log( `You made it to the ${login.name} controller, but there was an error:\n\t${error}`)
            return res.status(400).json({ errors: ['Something went wrong'] })
        }
}

module.exports = login