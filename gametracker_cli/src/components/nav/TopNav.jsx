import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../css/TopNav.css'


const TopNav = (props) => {
    const {
        user, 
        //toggle check
        dropdownCheck, 
        //toggle functions
        handleToggle, 
        handleBlur
    } = props
    
    return (
        <div className='flex nav-top'>
            { fixedTopNav() }
            {/* check to see if use is authed */}
            { user ? authenticatedTopNav(user, dropdownCheck, handleToggle, handleBlur) : unauthenticatedTopNav() }
        </div>
    )
}

// this nav always shows
const fixedTopNav = () => (
    <>
        <div className="flex nav-top-left">
            <div className='flex nav-title-logo-container'>
                <NavLink className='flex' to="/">
                    <img
                        src={require("../../resources/img/logo_placeholder.png")}
                        className='logo-placeholder'
                    />
                    <h3 className='title'>MyGameList</h3>
                </NavLink>
            </div>
            <div className="flex nav-space-between-wrapper">
                <div className="flex nav-intro-text-container">
                    <div className="flex-col nav-intro-text-left">
                        <p className='nav-intro-text'>Track,</p>
                        <p className='nav-intro-text'>Rate,</p>
                        <p className='nav-intro-text'>Review,</p>
                    </div>
                    <h1 className='nav-intro-text'>your video games</h1>
                </div>
                <form className='flex nav-search-container'>
                    <input placeholder='Search games, genre, characters...' className='nav-search-input' />
                    <button type='submit' className='flex nav-search-icon-wrapper'>
                        <img
                            src={require("../../resources/img/search.svg")}
                            className='nav-search-icon'
                        />
                    </button>
                </form>
            </div>
        </div>
    </>
)

// This nav shows when user is authenticated
const authenticatedTopNav = (user, dropdownCheck, handleToggle, handleBlur) => (
    <div className="flex nav-top-right">
        {/* these events trigger the dropdown */}
        <div onClick={(e) => handleToggle(e)} onBlur={(e) => handleBlur(e)} tabIndex="0" className='flex nav-user-dropdown-button'>
            <img
                src={require("../../resources/img/profile_placeholder.png")}
                className='nav-pfp-PLACEHOLDER disable-select'
            />
            <h3 className='nav-username disable-select'>{user.username}</h3>
            <img
                src={require("../../resources/img/caret.png")}
                className='nav-caret disable-select'
                style={{
                    transform: dropdownCheck === false ? 'rotate(0deg)' : 'rotate(-180deg)',
                    transition: 'transform .95s cubic-bezier(.16,1.1,.59,.98)'
                }}
            />
            {/* dropdown */}
            {dropdownCheck && (
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
                        <NavLink className='flex logout-button' to="/logout">
                            <h3 className='logout-text'>Logout</h3>
                            <img
                                src={require("../../resources/img/exit_door.svg")}
                                className='logout-icon'
                            />
                        </NavLink>
                    </li>
                </ul>
            )}
        </div>
    </div>
)

//this nav shows when user is unauthenticated
const unauthenticatedTopNav = () => (
    <div className="unauth-right-nav flex">
        <NavLink className='flex unauth-nav-button login' to="/login">
            Login
        </NavLink>
        <NavLink className='flex unauth-nav-button signup' to="/signup">
            Sign Up
        </NavLink>
    </div>
)

export default TopNav