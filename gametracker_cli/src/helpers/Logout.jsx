import { signOutUser } from '../services/auth'

const SignOut = props => {
  const { history, clearUser, user } = props
  // setTimeout(() => {
  //   signOutUser(user)
  //   .then(() => clearUser())
  //   .finally(() => history.push('/'))
  // }, 800)
  signOutUser(user)
    .then(() => clearUser())
    .finally(() => history.push('/'))
  // return 'signing out'
  return ''
}

export default SignOut
