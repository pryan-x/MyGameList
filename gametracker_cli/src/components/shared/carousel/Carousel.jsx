import React, { Component } from 'react';
import CarouselCaret from './CarouselCaret.jsx'
import RenderCarouselItems from './RenderCarouselItems.jsx'

import '../../../css/carousel/CarouselDefault.css'
import '../../../css/carousel/CarouselShared.css'
import '../../../css/carousel/CarouselSmaller.css'
import '../../../css/carousel/CarouselVideo.css'


class Carousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.carouselTitle,
            content: props.carouselContent,
            jumps: props.carouselJumps,
            carouselType: props.carouselType
                ? props.carouselType
                : 'default',

            // animation states
            carouselShiftAnimation: null,
            centerVideoIndex: null,
            videoFocused: null,
            videoLoaded: false,
            preFocusIndex: null,

            // video playback check
            playing: false,
            //** timeout check for whether video will be playing in xxxms
            queuedToPlay: false,
            //**  
        }
    }  

    componentDidMount = () => {
        this.reorderArrForCarousel()
    }

    reorderArrForCarousel = () => {
        this.setState(prevState => {
            const reorderedArr = [...prevState.content]
            
            // first initialize items as an even amount for styling and functionality purposes
            if (reorderedArr.length % 2 !== 0) {
                reorderedArr.pop()
            }
            return {
                centerVideoIndex: (reorderedArr.length/2)-1,
                content: [
                    // half+3 most important results are taken, then reversed so they are in the middle
                    ...reorderedArr.splice(0, (reorderedArr.length/2)+2).reverse(), 
                    // rest of games
                    ...reorderedArr
            ].reverse()

        }})
    }

    focusVideo = (arrIndex) => {
        // video can only be focused to play when its the center video
        if (arrIndex === this.state.centerVideoIndex) {
            this.setState({
                videoFocused: arrIndex,
                videoLoaded: false,
                playing: false,
            })
        }

        // If left or right thumbnail is clicked during animation: video is queued to focus after finished.
        if ((this.state.preFocusIndex !== arrIndex) 
            && (arrIndex !== this.state.centerVideoIndex) 
            && this.state.carouselShiftAnimation) 
        {
            this.setState({ 
                preFocusIndex:  arrIndex,
            });
        }
    }

    handleVideoLoad = () => {
        this.setState(({ videoLoaded: true }))
    }

    setPlaying = (play) => {
        // pause
        if(!play) {
            setTimeout(() => {
                this.setState({ 
                    // if queuedtoplay is false, pause
                    // if true, keep this.state.playing unchanged as true to keep pause transitions from running when playing
                    playing: this.state.queuedToPlay,
                    queuedToPlay: false
                }) 
            }, 500)
        }

        // play
        if (play) {
            this.setState(prevState =>({ 
                playing: play,
                // queuedtoplay gets set true ONLY IF the timeout for pause has not run yet and playing is still set to true from playing again quickly after pausing(to smooth play+pause transitions)
                queuedToPlay: prevState.playing
            })) 
        }

    }

    shift = (arr, direction, jumps) => {
        const shiftedArr = [...arr]
        // shifts items in arr x amt of times depending on how many jumps to make
        for ( let i = 0; i <= jumps; i++ ) {
            direction === 'r' 
                ? shiftedArr.push(shiftedArr.shift())
                : shiftedArr.unshift(shiftedArr.pop())
        }
        return shiftedArr
    }

    shiftCarousel = (e) => {
        // grabs classname for carouselshift direction check (will be right or left)
        const directionToShift = e.currentTarget.getAttribute('class')
        
        // stop and return if: animation is running OR if the center video was clicked
        if( this.state.carouselShiftAnimation || directionToShift.includes('center') ) {
            return
        }
        
        // true if element's class contains 'right'
        const shiftRightOrLeft = directionToShift.includes('right')

        this.setState(prevState => {
            return {
                // activates animation
                carouselShiftAnimation: shiftRightOrLeft
                    ? 'right'
                    : 'left',

                preFocusIndex: null,
                playing: false,
            }
        }, () => {
            setTimeout(() => {
                // reset animation and values after animation is done
                this.setState(prevState => {
                    return {
                        // reorders the carousel content to match the animation shift
                        content: shiftRightOrLeft
                            ? this.shift(prevState.content, 'r', prevState.jumps) 
                            : this.shift(prevState.content, 'l', prevState.jumps),
                        // sets the video focus to null (reset) or the new center video if the shifted video was queued before animation finished
                        videoFocused: prevState.preFocusIndex === null 
                            ? null
                            : prevState.centerVideoIndex,
                        // resets animation
                        carouselShiftAnimation: null,
                            
                        preFocusIndex: null,
                        videoLoaded: false,
                    }
                })
            // for animation and carousel content change to match up, timeout has to be a little under timing as the keyframes timing for the shift animation
            }, 475)
            // }, 460)
            // }, 15000)
            // }, 5000)
            // }, 40000)
        })
    }
    
    render () {
        const {
            title,
            content,
            carouselShiftAnimation,
            carouselType,
            centerVideoIndex,
            videoFocused,
            videoLoaded,
            playing,
            preFocusIndex
        } = this.state
        
        return (
            <div className='flex-col homepage-carousel'>
                <div className='carousel-header-container'>
                    <p className='carousel-header-text'>
                        {title}
                    </p>
                </div>
                <div className={`flex-col carousel-container ${carouselType}`}>
                    <CarouselCaret 
                        shiftCarousel={this.shiftCarousel}
                        direction={'left'}
                    />

                    <CarouselCaret 
                        shiftCarousel={this.shiftCarousel}
                        direction={'right'}
                    />
                    <div 
                        className={`flex carousel-list ${
                            carouselShiftAnimation 
                                ? `carousel-animation-active-${carouselShiftAnimation}` 
                                : ''
                            } ${carouselType}`
                        }
                    >
                        {content && 
                                <RenderCarouselItems  
                                    carouselType={carouselType}
                                    carouselItems={content}

                                    // carousel animation 
                                    shiftCarousel={this.shiftCarousel}

                                    // video helpers
                                    focusVideo={this.focusVideo}
                                    handleVideoLoad={this.handleVideoLoad}
                                    setPlaying={this.setPlaying}

                                    // state
                                    carouselShiftAnimation={carouselShiftAnimation}
                                    centerVideoIndex={centerVideoIndex}
                                    videoFocused={videoFocused}
                                    videoLoaded={videoLoaded}
                                    playing={playing}
                                    preFocusIndex={preFocusIndex}
                                />
                        }
                    </div>

                </div>
            </div>
        )
    }
}

// handleCardSizes = (cardsToDisplay) => {
//     // add mediaqueries later
//     if (cardsToDisplay === 4) {
//         return {
//             maxWidth: '21%',
//             flex: '0 0 21%'
//         }
//     } else if (cardsToDisplay === 3) {
//         return {
//             maxWidth: '18%',
//             flex: '0 0 18%'
//         }
//     }
// }

export default Carousel
