import api from './apiConfig'

export const fetchHomepageGames = async () => {
    console.log('homepagedata fetched from api')

    try {
        const resp = await api.get('/igdb/homepagedata')
        console.log('/api/igdb/homepagedata req finished: ', resp)
        return resp.data
      } catch (error) {
        throw error
      }
}

export const fetchGamepageGame = async (gameid) => {
  try {
      console.log('game was fetched ')
      const resp = await api.get('/igdb/gamepagedata', {
        params: {
          gameid: gameid
      }})
      console.log('/api/igdb/gamepagedata req finished: ', resp)
      return resp.data
    } catch (error) {
      throw error
    }
}

