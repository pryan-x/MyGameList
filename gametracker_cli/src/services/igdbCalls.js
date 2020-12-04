import api from './apiConfig'

export const fetchHomepageGames = async () => {
    console.log('homepagedata fetched from api')

    try {
        console.log('games were fetched ')
        const resp = await api.get('/igdb/homepagedata')
        // console.log('/api/igdb/homepagedata req finished: ', resp)
        return resp.data
      } catch (error) {
        throw error
      }
}
