const { initialize } = require('passport');
const passport = require('passport');

const loginStrategy = require('./loginStrategy');
const signUpStrategy = require('./signUpStrategy');

initializeStrategies = () => {
    passport.use('local-signup', signUpStrategy);
    passport.use('local-signin', loginStrategy);
}


module.exports = initializeStrategies