const bcrypt = require('bcrypt')
const SALT_ROUNDS = process.env.SALT_ROUNDS

const { findUserByName, createUser } = require('../../queries')
const db = require('../../db')


const signUp = async (req, res) => {
    try {
        const { username, password, password2 } = req.body
        let errors = [];
        
        //error handling to return registration bad requests
        if (!username || !password || !password2) {
            errors.push( "Please enter all fields" )
        }

        if (password.length < 6) {
            errors.push( "Password should be at least 6 characters" )
        }

        if (password != password2) {
            errors.push( "Passwords do not match" )
        }

        //query to check for row with username 
        // let findUserByName = {
        //     text: 
        //         `SELECT * FROM users
        //         WHERE username = $1`,
        //     values: 
        //         [username]
        // }
        
        db.query(findUserByName(username), (error, results) => {
            if (error) {
                throw error
            }
            // if (results.rows.length > 0) {
            //     errors.push( "Username is already registered" )
            // }
            if (results.rows[0]) {
                errors.push( "Username is already registered" )
            }
        })

        //11 salt rounds -> consider changing to 10
        const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS))

        //query to create user
        // createUser = {
        //     text: 
        //         `INSERT INTO users (username, password)
        //         VALUES ($1, $2)
        //         RETURNING id, password`,
        //     values: 
        //         [username, hashedPassword]
        //     }

        // conditional to check if errors were found and to return them,
        // else create user
        if (errors.length > 0) {
            return res.status(400).json({ errors })
        } else {
            db.query(createUser(username, hashedPassword), (error, results) => {
                if (error) {
                    throw error
                } 
                return res.status(201).json({ message: 'Success' })
            })
        }
    } catch (error) {
		console.log(
			`You made it to the ${signUp.name} controller, but there was an error:\n\t${error}`
		)
		return res.status(400).json({ errors: [error.message] })
    }
}

module.exports = signUp