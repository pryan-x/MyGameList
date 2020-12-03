import React, { Component } from 'react';
// https://images.igdb.com/igdb/image/upload/t_cover_big/co1veb.jpg
import '../../css/Carosel.css'

const Carosel = (props) => {
    const {
        name,
        games,
    } = props

    return (
        <div className='homepage-carosel'>
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
    console.log(games)
    return ( 
        games.map((game, id) => (
            <div key={id} className='flex-col carosel-child'>
                <div className='flex-col carosel-child-content-wrapper'>
                    <img 
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`} alt='img'
                    />
                    <div>
                        <p className='carosel-child-title'>{game.name}</p>
                    </div>
                </div>
                    {/* <p className='carosel-game-'></p> */}
            </div>
        ))
    )
}


export default Carosel
