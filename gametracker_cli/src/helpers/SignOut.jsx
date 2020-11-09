import { signOutUser } from '../services/auth'

const SignOut = props => {
  const { history, clearUser, user } = props
  signOutUser(user)
    .then(() => clearUser())
    .finally(() => history.push('/'))
  return ''
  // return 'signing out'
}

export default SignOut
