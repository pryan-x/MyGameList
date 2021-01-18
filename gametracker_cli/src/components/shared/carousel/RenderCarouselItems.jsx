import React from 'react';
import ReactPlayer from 'react-player/youtube'
import Spinner from './LoadingSpinner.jsx'
import { Link } from 'react-router-dom'


export default (props) => {
    return (
        props.carouselType === 'video' 
            ? <RenderVideoCards {...props} />
            : <RenderGameCards 
                carouselType={props.carouselType} 
                carouselItems={props.carouselItems} 
            />
    )
}

const RenderVideoCards = (props) => {
    const {
        // carousel content
        carouselItems,
        
        // helpers
        shiftCarousel,
        
        // state objs
        carouselShiftAnimation,
        centerVideoIndex,
        videoFocused,
        playing,

    } = props

    return carouselItems.map((game, id) => (
        <div 
            key={game.id} 
            className={`flex-col carousel-card video`}
        >
            {/* 
            check image size, if not normal thumbnail size, use normal thumbnail
            light={ true }
            */}
            <div 
                className={`flex-col carousel-card-content-wrapper ${
                    videoFocused === id && !carouselShiftAnimation
                        ? 'focused' 
                        : ''
                } ${ 
                    id === centerVideoIndex 
                    ? 'center'
                        : id < centerVideoIndex 
                            ? 'left' 
                            : 'right'
                }`}
                onClick={shiftCarousel}
            >
                <HandleVideoFocusRendering 
                    { ...props }
                    game={ game }
                    id={ id }
                />
                <JustTitle
                    game={game}
                    // passing true/false result for title display transistion
                    // if video is videoFocused, and currently playing pass true (dont display)
                    hideTitle={(videoFocused === id && playing)}
                />
            </div>
        </div>
    ))
}
const RenderGameCards = (props) => {
    const {
        // carousel content
        carouselItems,

        // check for smaller carousel type displaying only title of item
        carouselType,
    } = props
    return carouselItems.map((game, id) => (
        <div 
            key={game.id} 
            className={`flex-col carousel-card ${carouselType}`}
        >
            <Link className='flex-col carousel-card-content-wrapper' to={`/game/${game.id}`}>
            {/* <div className='flex-col carousel-card-content-wrapper'> */}
                { game.cover 
                    ? <img 
                        className='carousel-card-img'
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big${carouselType === 'smaller' ? '' : '_2x'}/${game.cover.image_id}.jpg`} 
                        alt='img'
                    />
                    : ''
                }
                {carouselType === 'smaller' 
                    ? <JustTitle game={game} carouselType={carouselType}/>
                    : <div className='flex carousel-card-metadata'>
                        <div className='flex-col carousel-card-metadata-left'>
                            <p className='carousel-card-title'>{game.name}</p>
                            { game.genres && 
                                <p className='carousel-card-subtitle'>
                                    {game.genres[0].name}
                                </p> 
                            }
                        </div> 
                        {game.rating &&
                            <div className='flex-col carousel-card-metadata-right'>
                                <p className='carousel-card-rating-text'>Score:</p>
                                <p className='carousel-card-rating'>
                                    {(game.rating/10).toFixed(2)}
                                </p>
                            </div>
                        }
                    </div>
                }
            {/* </div> */}
            </Link>
        </div>
    ))
}

const JustTitle = (props) => (
    <div 
        className='flex carousel-custom-container'
        style={{
        // if video is playing, dont hide title
            opacity: props.hideTitle ? 0 : 1,
            visibility: props.hideTitle ? 'hidden' : 'visible',
        }}
    >
        <div 
            className='flex carousel-card-metadata'
        >
            {props.carouselType === 'smaller' 
                ? <p className='carousel-card-title'>{props.game.name}</p> 
                : <Link
                    className='carousel-card-title'
                    to={`/game/${props.game.id}`}
                >{props.game.name}</Link>
             }
        </div>
    </div>
)

const HandleVideoFocusRendering = (props) => {
    const {        
        // helpers
        focusVideo,
        handleVideoLoad,
        setPlaying,
        
        // state objs
        carouselShiftAnimation,
        videoFocused,
        videoLoaded,
        preFocusIndex,
        id, 
        game
    } = props

    if ( videoFocused === id ) {
    // render this when a thumbnail has been focused (clicked on)
        return (
            <div className={`carousel-video-container`} >
                <Spinner 
                    style={{ 
                        display: 
                        // dont display spinner after loaded
                            videoLoaded  ? 'none' : 'block'
                    }} 
                />
                <ReactPlayer 
                    className='carousel-video-player'
                    url={`https://www.youtube.com/watch?v=${game.videos[0].video_id}`} 
                    onReady={ handleVideoLoad }	
                    onPause={ () => setPlaying(false) }
                    onPlay={ () => setPlaying(true) }
                    playing={ true }
                    muted={true}
                    controls
                    width='100%'
                    height='100%'
                />
                <img 
                    className={`carousel-card-img .disable-select`}
                    draggable={false}
                    src={`https://img.youtube.com/vi/${game.videos[0].video_id}/hqdefault.jpg`}
                    // src={`https://img.youtube.com/vi/${game.videos[0].video_id}/maxresdefault.jpg`} 
 
                    alt='img'
                    style={{
                    // if video not loaded or carousel is in animation, display thumbnail, else show video iframe
                        opacity: !videoLoaded 
                            ? 1
                            : carouselShiftAnimation 
                                ? 1
                                : 0
                    }}
                />                        
                { carouselShiftAnimation && 
                    <div className='carousel-play-img-wrapper'>
                        <img 
                            draggable={false}
                            className='carousel-play-img disable-select opacity-transition-play-icon'
                            src={require("../../../resources/img/play.png")}
                            alt='img'
                        />
                    </div>
                }
                <div key={game.id} className='shadow-image-fix'></div>
            </div>
        )
    } else {
        return  (
            <div 
                onClick={() => {focusVideo(id)}}
                className={`carousel-video-container nofocus`} 
            >
                <img 
                    draggable={false}
                    src={`https://img.youtube.com/vi/${game.videos[0].video_id}/hqdefault.jpg`} 
                    // src={`https://img.youtube.com/vi/${game.videos[0].video_id}/maxresdefault.jpg`} 
                    alt='img'
                    className='carousel-card-img disable-select'
                />

                { preFocusIndex === id
                // If clicked before animation is completed: video is queued to focus. This check displays spinner to indicate video will load when animation is finished
                    ? <Spinner/>
                    : <div className='carousel-play-img-wrapper'>
                        <img 
                            draggable={false}
                            className='carousel-play-img disable-select'
                            src={require("../../../resources/img/play.png")}
                            alt='img'
                        />
                    </div>
                }
                <div  key={game.id} className='shadow-image-fix'></div>
            </div>
        )
    }
}

