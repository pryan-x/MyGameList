import React from 'react';
// https://images.igdb.com/igdb/image/upload/t_cover_big/co1veb.jpg
import '../../css/Carosel.css'

const Carosel = (props) => {
    const {
        name,
        games,
    } = props

    return (
        <div className='flex-col homepage-carosel'>
            <div className='carosel-header-container'>
                <p className='carosel-header-text'>
                    {games.name}
                </p>
            </div>
            <div className='flex carosel-container'>
                {/* <div className='flex carosel-list'> */}
                    {games ? renderGames(games.result) : null}
                {/* </div> */}
                <div className='carosel-caret caret-left'>
                        {/* <img 
                            className='carosel-caret-img' alt='img'
                        /> */}
                    </div>
                    <div className='carosel-caret caret-right'>
                        {/* <img 
                            className='carosel-caret-img' alt='img'
                        /> */}
                    </div>
            </div>
        </div>
    )
}

const renderGames = (games) => {
    console.log(games[0].genres[0].name)
    return ( 
        games.map((game, id) => (
            <div key={id} className='flex-col carosel-card'>
                <div className='flex-col carosel-card-content-wrapper'>
                    <img 
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} alt='img'
                    />
                    <div className='flex carosel-card-metadata'>
                        <div className='flex-col carosel-card-metadata-left'>
                            <p className='carosel-card-name'>{game.name}</p>
                            { game.genres ? 
                                <p className='carosel-card-genre'>{game.genres[0].name}</p> 
                                : null
                                // : <p className='carosel-card-genre' style={{color:'white'}}>l</p> 
                            }
                        </div>
                        <div className='flex-col carosel-card-metadata-right'>
                        {/* <p className='carosel-card-ratingx'>Scored:</p> */}
                            <p className='carosel-card-rating'>{(game.rating/10).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                    {/* <p className='carosel-game-'></p> */}
            </div>
        ))
    )
}


export default Carosel
