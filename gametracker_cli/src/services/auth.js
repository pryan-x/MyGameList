import api from './apiConfig'

export const loginUser = async credentials => {
    try {
      const resp = await api.post('/auth/login', credentials)
      console.log('Login finished: ', resp)

      localStorage.setItem('token', resp.data.token)
      // localStorage.setItem('user', resp.data.user)

      localStorage.setItem('user', JSON.stringify(resp.data.user))
      return resp.data
    } catch (error) {
      throw error
    }
  }

  export const signUpUser = async credentials => {

    try {
      const resp = await api.post('/auth/signup', credentials)
      // localStorage.setItem('token', resp.data.token)
      console.log('Sign up finished: ', resp)
      return resp.data
    } catch (error) {
      throw error
    }
  }

export const authUser = async (type, credentials) => {
  if (type === 'Sign Up') {
    return await signUpUser(credentials).then(() => loginUser(credentials))

  } else {
    return loginUser(credentials)
  }
}

export const signOutUser = async user => {

    try {
      await localStorage.clear()
      return true
    } catch (error) {
      throw error
    }
  }