import Axios from 'axios'

const getToken = () => localStorage.getItem('token')

const JwtToken = getToken()

let apiUrl

const apiUrls = {

	production: 'n/a',
  	development: 'http://localhost:3001/api'

}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

// sends JWT token to get 
const api = Axios.create({
	baseURL: apiUrl,
	headers: {
		Authorization: `Bearer ${JwtToken}`
	}
})

export default api
