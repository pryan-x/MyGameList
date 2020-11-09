import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { loginUser } from '../services/auth'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      isError: false,
      errorMsg: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    //   isError: false,
    //   errorMsg: ''
    })
  }

  onLogin = event => {
    event.preventDefault()
    loginUser(this.state)
      .then(res => {
        this.props.setUser(res.user)
        
        // return (
        // <Redirect 
        //   to={{ pathname: 
        //     this.state.from ? 
        //     `${this.state.from }` :
        //     `/`
        //   }}
        // />
        // )
      })
      // .finally(() => this.props.history.push(
      //   this.state.from ? 
      //   `${this.state.from}` :
      //   `/`))
      .catch(error => {
        console.error(error)
        this.setState({
          isError: true,
          errorMsg: 'Invalid username or password',
          username: '',
          password: ''
        })
      })
  }

  renderError = () => {
    // const toggleForm = this.state.isError ? 'danger' : 'none'
    if (this.state.isError) {
        return (
            <div className='flex-col'>
            <div>
                <button type="submit">Login</button>
            </div>
            {/* <p className={toggleForm}>{this.state.errorMsg}</p> */}
            <p>{this.state.errorMsg}</p>
            </div>
    )} else {
        return (
            <div> 
                <button>Login</button>
            </div>
    )}
  }

  render() {
    const { username, password } = this.state

    return (
      <>
        <h3>Sign In</h3>
        <form onSubmit={this.onLogin}>
        {/* <form onSubmit={(e) => this.onLogin(e)}> */}
          <p>Username</p>
          <input
            required
            type="text"
            name="username"
            value={username}
            placeholder="Enter Username"
            onChange={this.handleChange}
          />
          <p>Password</p>
          <input
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          {this.renderError()}
        </form>
        <div className='flex-col'>
            <p>Dont have an account?</p>
            {/* <button onClick={this.props.toggleLogin}>Register here</button> */}
            <NavLink to="/signup">
                <button onClick={this.props.toggleLogin}>Register here</button>
            </NavLink>

        </div>
      </>
    )
  }
}

export default Login
