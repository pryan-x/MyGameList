import React from 'react'
import { NavLink } from 'react-router-dom'
// import Navbar from './shared/Navbar.jsx'
// import SignIn from './SignIn'
// import SignUp from './SignUp'
// import '../styles/Header.css'


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

/*

difference between <link> and <navlink> is that one can 
customize styles if link is currently active.
ex:
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
  activeClassName="selected"

  **if not working try exact to="{route}"**

*/

  authenticatedLinks = () => (
    <div className="flex">
      <NavLink to="/signout">
        <h3>Sign Out</h3>
      </NavLink>
    </div>
  )

  unauthenticatedLinks = () => (
    <div className="flex">
      <NavLink to="/login">
        <h3>Login</h3>
      </NavLink>
      <NavLink to="/signup">
        <h3>Sign Up</h3>
      </NavLink>
    </div>
  )

  alwaysLinks = () => (
    <div className="flex">
      <NavLink to="/">
        <h3>Home</h3>
      </NavLink>
    </div>
  )

  render() {
    const { user } = this.props
    return (
      <React.Fragment>
        {/* <Navbar> */}
          <div className="flex">
            {this.alwaysLinks()}
            {/* {user && <span className="navbar-text greeting">Logged in as: {user.username}</span>} */}
            {/* {user ? this.authenticatedLinks() : this.unauthenticatedLinks(this.props, setUser, this.state.login)} */}
            {user ? this.authenticatedLinks() : this.unauthenticatedLinks()}
          </div>
        {/* </Navbar> */}
      </React.Fragment>
    )
  }
}

export default Header
