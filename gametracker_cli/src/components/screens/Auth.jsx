import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { authUser } from '../../services/auth'



class Auth extends Component {
    constructor() {
        super()
        this.state = {
        username: '',
        email: '',
        password: '',
        password2: '',
        isError: false,
        errors: null,
        authType: ''
        }
    }

    componentDidMount = () => {
        this.setState({
            authType: this.props.authType
        })
    }

    toggleAuth = () => {
        this.setState(prevState=>({ 
        authType: prevState.authType === 'Login' ? 'Sign Up' : 'Login'
    }))

    }

    handleChange = event => {
        this.setState({
        [event.target.name]: event.target.value,
        //option to remove errors once 
        //   isError: false,
        //   errors: ''
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const { setUser } = this.props

        //authUser checks if it is signup or login Auth
        //then signs up or logins in the user
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
            // errors saved and rendered
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
        // const toggleForm = this.state.isError ? 'danger' : ''
        if (this.state.isError) {
            return this.state.errors.map((error, id) => (
            <p key={id}>{error}</p>
            ))
        } 
    }


    render() {
        const { email, username, password, password2 } = this.state
        const { authType } = this.state


        return (
            <div>
                
                {/* {
                // checks to render signup or login component
                    authType === 'login' ? 
                   <Login 
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        renderError={this.renderError}
                        username={username}
                        password={password}
                        /> : 
                        <SignUp
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        renderError={this.renderError}
                        username={username}
                        password={password}
                        password2={password2}
                    />
                } */}

            <h3 className='auth-prompt'>{authType}</h3>
                <form onSubmit={this.handleSubmit}>
                    <p className='input-prompt'>Username</p>
                    <input
                    required
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Enter username"
                    onChange={this.handleChange}
                    />
                    {/* <AuthInput
                    placeholderString='Username'
                    inputName={username}
                    handleChange={props.handleChange}
                    /> */}
                    {/* <p className='input-prompt'>Email address</p>
                    <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={this.handleChange}
                    /> */}
                    <p>Password</p>
                    <input
                    required
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Enter Password"
                    onChange={this.handleChange}
                    />
                    {authType === 'Sign Up' && (
                        <>
                        <p>Confirm Password</p>
                        <input
                        required
                        name="password2"
                        value={password2}
                        type="password"
                        placeholder="Confirm Password"
                        onChange={this.handleChange}
                        />
                        </>
                    )}
                    <div>
                        <button type="submit">
                            {authType === 'Sign Up' ?
                            'Create Account' : 'Login'}
                        </button>
                    </div>
                    <div>
                        {this.renderError()}
                    </div>
                </form>
                <div className='flex-col'>
                    <p>
                        {authType === 'Sign Up' ?
                        'Have an account?' :
                        'Dont have an account?'}
                    </p>
                    {/* <button className='login-toggle' onClick={this.props.toggleLogin}>Login here</button> */}
                    {/* <NavLink to="/login"> */}
                    <div>
                        <button onClick={this.toggleAuth}>{authType} here</button>
                    </div>
                    {/* </NavLink> */}
                </div>
            </div>
        )
    }
}

export default Auth
