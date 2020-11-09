import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const AuthenticatedRoute = ({
  component: Component,
  children,
  user,
  render,
  ...rest
//picks out specifics from props, ...rest then captures the rest
//and passes it, its like ...props without what was taken
}) => {
  console.log(
    '\ncomponent: ',
    Component,
    '\nchildren: ',
    children,
    '\nuser: ',
    user,
    '\nrender: ',
    render,
    '\nrest: ',
    ...rest,
  )
  return (
    <Route
      {...rest}
      // render={(props) => {
      // render={(props) => user === true
      //   user 
      //   ? <Component {...props} />
      //   : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      // }}
      render={(props) =>
        user ?
        render :
        <Redirect to={{pathname: '/login', state: { from: props.location }}}/>
      }
    />
  )
}
export default AuthenticatedRoute
    
// const AuthenticatedRoute = ({
//   component: Component,
//   children,
//   user,
//   render,
//   ...rest
// }) => {
//   if (user && render) {
//     return <Route {...rest} render={render} />
//   } else {
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           user ? <Component {...props} /> : <Redirect to="/" />
//         }
//       />
//     )
//   }
// }

// export default AuthenticatedRoute