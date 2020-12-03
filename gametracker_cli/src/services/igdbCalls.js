import api from './apiConfig'

export const fetchHomepageGames = async () => {
    try {
        const resp = await api.get('/igdb/homepagedata')
        // console.log('/api/igdb/homepagedata req finished: ', resp)
        return resp.data
      } catch (error) {
        throw error
      }
    // console.log('fetched games call')
}
