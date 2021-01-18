import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../components/screens/Home'

import Logout from '../helpers/Logout'
import Auth from '../components/screens/Auth.jsx'
import GamePage from '../components/screens/GamePage.jsx'

// import AuthenticatedRoute from '../helpers/AuthenticatedRoute'


// const Routes = ({ 
//   user, setUser, clearUser, homepageData
// }) => (

const Routes = React.memo(props => {
  const { 
    user, setUser, clearUser, homepageData, handleBasePageClass
  } = props

// export default React.memo = ({ 
// // const Routes = ({ 
//   user, setUser, clearUser, homepageData
// }) => (

return(
  <Switch>
    <Route
      exact path="/"
      render = { props =>
        homepageData && <Home homepageGames={homepageData} user={user} />
      }
    />

    <Route
      path="/login"
      // component remounts component to refresh new route and input values
      // this is for switching btw login and signup, as Auth does both
      component={props => user ?
        <Redirect to={{pathname: '/'}}/> :
        // pass authType prop to render Login Auth 
        <Auth {...props} authType='Login' setUser={setUser} />
      }
    //   render={props => {
    //     console.log('user: ', user)
    //     console.log('user is logged? : ', user ? true : false)
    //     if (user) {
    //       return <Redirect to="/"/>
    //     } else {
    //       // pass authType prop to render login Auth 
    //       return <Auth {...props} authType='Login' setUser={setUser} />
    //     }
    // }}
    />

    <Route
      path="/signup"
      component={props => user ?
        <Redirect to={{pathname: '/'}}/> :
        // pass authType prop to render signup Auth 
        <Auth {...props} authType='Sign Up' setUser={setUser} />
      }
    />
    <Route
      exact path="/logout"
      render={props => <Logout {...props} clearUser={clearUser} user={user} />}
    />
    <Route
      path="/game/:gameid"
      render={props => <GamePage {...props} handleBasePageClass={handleBasePageClass} />}
    />
  </Switch>

    // <Switch>
    //   <Route
        // exact
        // path="/"
        // render={props =>
        //   <Home />
        // }
    //   />
      // <Route
      //   path="/login"
      //   render={props => <SignIn {...props} setUser={setUser} />}
      // />
      // <Route
      //   path="/sign-up"
      //   render={props => <SignUp {...props} setUser={setUser} />}
      // />
      // <Route
      //   exact
      //   path="/sign-out"
      //   render={props => <SignOut {...props} clearUser={clearUser} user={user} />}
      // />
    //   <Route exact
    //     path="/tracks"
    //     render={props => <Tracks getTracks={getTracks} tracks={tracks} {...props} />}
    //   />
    //   <Route
    //     exact path="/tracks/track/:id"
    //     render={props => <Track {...props} />}
    //   />
    //   <Route exact
    //     path="/tracks"
    //     render={props => <Tracks tracks={tracks} {...props} />}
    //   />
    //   <AuthenticatedRoute
    //     exact
    //     path="/my-tracks"
    //     user={user}
    //     render={props => <MyTracks tracks={tracks} {...props} user={user} />}
    //   />
    //   <AuthenticatedRoute
    //     exact path="/my-tracks/track/:id"
    //     user={user}
    //     render={props => <Track {...props} />}
    //   />
    //   <AuthenticatedRoute
    //     exact
    //     path="/create-tracks"
    //     user={user}
    //     render={props => <CreateTrack addTrack={addTrack} {...props} user={user} />}
    //   />
    //   <AuthenticatedRoute
    //     exact
    //     path="/tracks/:id/edit"
    //     user={user}
    //     render={props => <EditTrack {...props} user={user} />}
    //   />
    // </Switch>

  // )
)
})

export default Routes
