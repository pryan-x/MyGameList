import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { authUser } from '../../services/auth'
import PageHeader from '../fixed/PageHeader'
import '../../css/Auth.css'

export default class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
        username: '',
        // email: '',
        password: '',
        password2: '',
        isError: false,
        errors: null,
        authType: props.authType
        }
    }

    // componentDidMount = () => {
    //     this.setState({
    //         authType: this.props.authType
    //     })
    // }

    handleChange = event => {
        this.setState({
        [event.target.name]: event.target.value,
        //option to remove errors once inputs are filled again
        //   isError: false,
        //   errors: null
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const { setUser } = this.props

        //authUser checks if the authentication is for signup or login 
        //with authType
        //then signs up and/or logins in the user
        authUser(this.state.authType, this.state)
        .then((res) => setUser(res.user))
        .catch(error => {
            this.setState({
            username: '',
            // email: '',
            password: '',
            password2: '',
            isError: true,
            errors: ['Something went wrong']
            })
            // errors saved and rendered with renderError
            if (error.response !== undefined) {
                if (error.response.data.errors) {
                this.setState({
                    errors: error.response.data.errors
                })
                }
            }
            
        })
    }

    renderError = () => {
        if (this.state.isError) {
            return (
                <div className='auth-error-container'> { 
                    this.state.errors.map((error, id) => (
                        <p className='auth-error' key={id}>{error}</p>
                    ))}
                </div>
            )
        } 
    }

    render() {
        // email,
        const { username, password, password2 } = this.state
        const { authType } = this.state

        return (
            <>
                {/* <PageHeader pageHeader={`${authType}`} /> */}
                <div className='flex-col auth-page'>
                    {/* <div>
                        <p style={{
                            marginBottom: '40px'
                        }}
                        className='auth-welcome'>Start organizing the games you have played!</p>
                    </div> */}
                    <div className='auth-wrapper'>
                        <div className='flex-col auth-container'>
                            <div className='flex-col auth-welcome-container'>
                                <p className='auth-welcome'>
                                    {authType === 'Sign Up' ?
                                    'Start using MyGameList!' :
                                    'Login to MyGameList'}
                                </p>
                                {authType === 'Sign Up' &&
                                <>
                                <p className='auth-intro'>
                                    Create an account with us to track, rate, review, and share your favorite games and more ...
                                </p>
                                <p className='auth-intro'>all in one place!</p>
                                </>
                                }
                            </div>
                            <form className='flex-col auth-form' onSubmit={this.handleSubmit}>
                                <p className='auth-input-prompt'>Username</p>
                                <input
                                className='auth-input'
                                required
                                type="text"
                                name="username"
                                value={username}
                                placeholder="Enter Username"
                                onChange={this.handleChange}
                                />
                                {/* <p className='input-prompt'>Email address</p>
                                <input
                                required
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Enter email"
                                onChange={this.handleChange}
                                /> */}
                                <p className='auth-input-prompt'>Password</p>
                                <input
                                className='auth-input'
                                required
                                name="password"
                                value={password}
                                type="password"
                                placeholder="Enter Password"
                                onChange={this.handleChange}
                                />
                                {/* if authtype is signup, 
                                include confirm password input */}
                                {authType === 'Sign Up' && (
                                    <>
                                    <p className='auth-input-prompt'>Confirm Password</p>
                                    <input
                                    className='auth-input'
                                    required
                                    name="password2"
                                    value={password2}
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={this.handleChange}
                                    />
                                    </>
                                )}
                                <button className='auth-submit' type="submit">
                                {/* changes submit button based on authType */}
                                    {authType === 'Sign Up' ?
                                    'Create Account' : 'Login'}
                                </button>
                                {this.renderError()}
                            </form>
                            {/* toggles to different auth page */}
                            <div className='flex-col auth-toggle-container'>
                                <p className='auth-toggle-text'>
                                    {authType === 'Sign Up' ?
                                    'Already have an account?' :
                                    'Dont have an account?'}
                                </p>
                                {/* link to remount and render component for different auth as well as change route */}
                                <Link className='auth-toggle' to={`/${authType === 'Sign Up' ? 'login' : 'signup'}`}>
                                    {authType === 'Sign Up' ?
                                    'Login here' :
                                    'Sign up here'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

