 //query to create user
const createUser = (username, hashedPassword) => {
    return ({ 
        text: 
            `INSERT INTO users (username, password)
            VALUES ($1, $2)
            RETURNING id, password`,
        values: 
            [username, hashedPassword]
    })
}

//query to check for row with given username 
const findUserByName = (username) => {
    return ({
        text: 
            `SELECT * FROM users
            WHERE username = $1`,
        values: 
            [username]
    })
}

const findUserById = (id) => {
    return ({
        text: 
            `SELECT * FROM users 
            WHERE id = $1`,
        values: 
            [id]
    })
}

module.exports = {
	createUser,
    findUserByName,
    findUserById
}