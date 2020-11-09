require('dotenv').config()

const express = require('express')
const app = express()

const apiRoute = require('./routes')
const PORT = process.env.PORT || 3001;

const passport = require("passport");
const morgan = require('morgan');
const cors = require('cors')

// const initializePassport = require("./passportConfig");
// initializePassport(passport);

// initializePassport()

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use(passport.initialize());


// sends everything with {PORT}/api to apiRoute directory
app.use('/api', apiRoute)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))