import React from 'react'
import { NavLink } from 'react-router-dom'
// import {useHistory} from 'react-router';
// import Navbar from './shared/Navbar.jsx'
// import SignIn from './SignIn'
// import SignUp from './SignUp'
import '../../css/Header.css'


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false
    }
  }
// componentDidMount = () => {
//   this.setState({
//     dropdown: false
//   })
// }
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

  handleToggle = (e) => {
    // e.target.focus();
    this.setState(prevState=>({ dropdown: !prevState.dropdown }));
  }
  


  handleBlur = (e) => {
    const currentTarget = e.currentTarget;
    // if (e.nativeEvent.explicitOriginalTarget &&
    //     e.nativeEvent.explicitOriginalTarget === e.nativeEvent.originalTarget) {
    //   return;
    // }
      // ANOTHER WORKAROUND
  //   console.log('fire')
  //   if (this.state.dropdown) {
  //     setTimeout(() => {
  //       this.setState({ dropdown: false });
  //     }, 100);
  //   }

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({ dropdown: false });
      }
    }, 0)
  }


  authenticatedLinks = (user) => (
    <div className="flex nav-top-right">
      <form className='flex nav-search-container'>
        <input placeholder='Search games, genre, characters...' className='nav-search-input'/>
        <button type='submit' className='flex nav-search-icon-wrapper'>
          <img 
            src={require("../../resources/img/search.svg")} 
              className='nav-search-icon'
          />
        </button>
      </form>
       
        <div onClick={(e) => this.handleToggle(e)} onBlur ={(e) => this.handleBlur(e)} tabIndex="0" className='flex nav-user-dropdown-button'>
          {/* PROFILE PIC PLACEHOLDER */}
          <img 
            src={require("../../resources/img/profile_placeholder.png")} 
              className='nav-pfp-PLACEHOLDER disable-select'
          />
          {/* <img src={require("../../resources/img/profile_placeholder.png")} className='nav-pfp'/> */}
          <h3 className='nav-username disable-select'>{user.username}</h3>
          <img 
            src={require("../../resources/img/caret.png")} 
            className='nav-caret disable-select' 
            style={{ 
              transform: this.state.dropdown === false ? 'rotate(0deg)' : 'rotate(-180deg)',
              transition: 'transform .95s cubic-bezier(.16,1.1,.59,.98)'
              // transition: 'transform .5s linear'
            }}
          />
        {this.state.dropdown && (
          <ul className='nav-user-dropdown' >
            <li>
              Profile
            </li>
            <li>
              Profile Settings
            </li>
            <li>
              Game List
            </li>
            <li>
              Reviews
            </li>
            <li>
              <NavLink className='flex logout-button-authenticated' to="/logout">
                <h3 className='logout-text-authenticated'>Logout</h3>
                <img 
                  src={require("../../resources/img/exit_door.svg")} 
                  className='logout-icon'
                />
              </NavLink>
            </li>
          </ul>
        )}
        </div>
        {/* <ul className={`nav-user-dropdown ${this.state.dropdown ? 'nav-dropdown-display' : ''}`}> */}
    </div>
  )

  unauthenticatedLinks = () => (
    <div className="flex">
      <NavLink to="/login">
        <button className='nav-button login'>Login</button>
      </NavLink>
      <NavLink to="/signup">
        <button className='nav-button sign-up'>Sign Up</button>
      </NavLink>
    </div>
  )

  alwaysLinks = () => (
    <div className="flex nav-top-left">
      <div className='flex nav-title-logo-container'>
        <img 
          src={require("../../resources/img/logo_placeholder.png")} 
          className='logo-placeholder'
        />
        <NavLink to="/">
          <h3 className='title'>MyGameList</h3>
        </NavLink>
      </div>
      <div className="flex nav-intro-text-container">
        <div className="flex-col nav-intro-text-left">
          <p className='nav-intro-text'>Track,</p>
          <p className='nav-intro-text'>Rate,</p>
          <p className='nav-intro-text'>Review,</p>
        </div>
        <h1 className='nav-intro-text'>your video games</h1>
      </div>
    </div>
  )

  render() {
    const { user } = this.props
    return (
      <React.Fragment>
        {/* <Navbar> */}
          <div className="flex">
            <div className='flex nav-top'>
              {this.alwaysLinks()}
              {/* {user && <span className="navbar-text greeting">Logged in as: {user.username}</span>} */}
              {/* {user ? this.authenticatedLinks() : this.unauthenticatedLinks(this.props, setUser, this.state.login)} */}
              {user ? this.authenticatedLinks(user) : this.unauthenticatedLinks()}
            </div>
          </div>
        {/* </Navbar> */}
      </React.Fragment>
    )
  }
}

export default Header
