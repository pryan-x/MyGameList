import React from 'react';
// https://images.igdb.com/igdb/image/upload/t_cover_big/co1veb.jpg
import '../../css/Carosel.css'

const Carosel = (props) => {
    const {
        caroselName,
        caroselContent,
        shiftCarosel,
        animationClass,
        animationType,
    } = props
    return (
        <div className='flex-col homepage-carosel'>
            <div className='carosel-header-container'>
                <p className='carosel-header-text'>
                    {caroselName}
                </p>
            </div>
            <div className='flex carosel-container'>
                {/* <div className='flex carosel-list'> */}
                {caroselContent && renderGames(caroselContent, caroselName, animationClass, animationType)}
                {/* </div> */}
                <div name={caroselName} onClick={shiftCarosel} className='flex-col carosel-caret-container caret-left'>
                    <img 
                        className='carosel-caret caret-left'
                        src={require("../../resources/img/carosel_caret_white.png")} alt='img'
                    />
                </div>
                <div name={caroselName} onClick={shiftCarosel} className='flex-col carosel-caret-container caret-right'>
                    <img 
                        className='carosel-caret caret-right'
                        src={require("../../resources/img/carosel_caret_white.png")} alt='img'
                    />
                </div>
            </div>
        </div>
    )
}

const renderGames = (games, caroselName, animationClass, animationType) => {
    // console.log(games[0].genres[0].name)
    console.log(games, 'render games')
    return ( 
        games.map((game, id) => (
            <div 
                key={id} 
                className={`flex-col carosel-card ${animationClass === caroselName && `carosel-animation-active-${animationType}`}`}
            >
                <div className='flex-col carosel-card-content-wrapper'>
                    <img 
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} alt='img'
                    />
                    <div className='flex carosel-card-metadata'>
                        <div className='flex-col carosel-card-metadata-left'>
                            <p className='carosel-card-name'>{game.name}</p>
                            { game.genres && 
                                <p className='carosel-card-genre'>
                                    {game.genres[0].name}
                                </p> 
                                // : <p className='carosel-card-genre' style={{color:'white'}}>l</p> 
                            }
                        </div>
                        
                        { game.rating &&
                            <div className='flex-col carosel-card-metadata-right'>
                                <p className='carosel-card-rating-text'>Score:</p>
                                <p className='carosel-card-rating'>
                                    {(game.rating/10).toFixed(2)}
                                </p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        ))
    )
}


export default Carosel
