import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { signUpUser, loginUser } from '../services/auth'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      isError: false,
      errors: null
    }
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value,
      isError: false,
      errors: ''
    })

  onSignUp = event => {
    event.preventDefault()

    const { setUser } = this.props

    signUpUser(this.state)
      .then(() => loginUser(this.state))
      .then((res) => setUser(res.user))
      .catch(error => {
        this.setState({
          // username: '',
          email: '',
          password: '',
          password2: '',
          isError: true,
          errors: ['Something went wrong']
        })


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

    return (
      <>
        <h3 className='login-prompt'>Sign Up</h3>
        <form onSubmit={this.onSignUp}>
          <p className='input-prompt'>Username</p>
          <input
            required
            type="text"
            name="username"
            value={username}
            placeholder="Enter username"
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
          <p>Password</p>
          <input
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <p>Confirm Password</p>
          <input
            required
            name="password2"
            value={password2}
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          <div>
            <button type="submit">Sign Up</button>
          </div>
          <div>
            {this.renderError()}
          </div>
        </form>
        <div className='flex-col'>
            <p>Have an account?</p>
            {/* <button className='login-toggle' onClick={this.props.toggleLogin}>Login here</button> */}
            <NavLink to="/login">
                <button>Login here</button>
            </NavLink>
        </div>
      </>
    )
  }
}

export default SignUp
