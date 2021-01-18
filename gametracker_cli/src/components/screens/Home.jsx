import React, { Component } from 'react';
import PageHeader from '../fixed/PageHeader'
import Carousel from '../shared/carousel/Carousel'
import RankList from '../shared/Ranklist'
// import { fetchHomepageGames } from '../../services/igdbCalls'

import '../../css/Home.css'


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            carouselGames: props.homepageGames,
            // carousel gamelists
            [props.homepageGames[0].name]: props.homepageGames[0],
            [props.homepageGames[1].name]: props.homepageGames[1],
            [props.homepageGames[2].name]: props.homepageGames[2],
            [props.homepageGames[3].name]: props.homepageGames[3],
            
            // screenshot list
            // [props.homepageGames[4].name]: props.homepageGames[4],

            // ranklist gamelists
            [props.homepageGames[props.homepageGames.length-2].name]: 
                props.homepageGames[props.homepageGames.length-2],
            [props.homepageGames[props.homepageGames.length-1].name]: 
                props.homepageGames[props.homepageGames.length-1],
                
            // // ranklist gamelists
            // [props.homepageGames[props.homepageGames.length-3].name]: 
            //     props.homepageGames[props.homepageGames.length-3],
            // [props.homepageGames[props.homepageGames.length-2].name]: 
            //     props.homepageGames[props.homepageGames.length-2],
                
            //     // last item in array should be topGamesOfThisYear
            // topGamesOfThisYear: 
            //     props.homepageGames[props.homepageGames.length-1] 
            //         ? props.homepageGames[props.homepageGames.length-1] 
            //         : null,

            // [props.homepageGames[props.homepageGames.length-1].name]: 
            //     props.homepageGames[props.homepageGames.length-1],
        }
    }  

    componentDidMount() {
        this.handleResize = () => {
          const match = window.matchMedia(`(max-width: 1000px)`);
          if (match.matches) {
            console.log(match)
          }
        }
    
        window.addEventListener("resize", this.handleResize)
        this.handleResize()
    }

    componentWillUnmount = () => {
        console.log('component unmount')
        window.removeEventListener("resize", this.handleResize)
    }

    render() {
        console.log('homepage rendered')
        const { 
            // dynamic state deconstructor, variable is the value
            [this.props.homepageGames[0].name] : popularRecentReleases,
            [this.props.homepageGames[1].name] : topUpcomingGames,
            [this.props.homepageGames[2].name] : mostAnticipated,
            [this.props.homepageGames[3].name] : popularTrailers,

            // ranklist gamelists
            [this.props.homepageGames[this.props.homepageGames.length-2].name] : topRatedGames,
            [this.props.homepageGames[this.props.homepageGames.length-1].name] : topGamesOfLastYear,
            topGamesOfThisYear,
            // [this.props.homepageGames[this.props.homepageGames.length-1].name] : topGamesOfThisYear,
        } = this.state
        // console.log(popularRecentReleases.result)
        return (
            <div className='flex homepage-container'>
                {/* <PageHeader pageHeader={`Welcome`} /> */}
                <div className='flex-col left-homepage'>
                    {popularRecentReleases && 
                        <Carousel 
                            carouselContent={popularRecentReleases.result} 
                            carouselTitle={popularRecentReleases.name}
                            carouselJumps={2}
                        />
                    }
                    {topUpcomingGames &&
                        <Carousel 
                            carouselContent={topUpcomingGames.result} 
                            carouselTitle={topUpcomingGames.name}
                            carouselJumps={2}
                        /> 
                    }
                    {mostAnticipated &&
                        <Carousel 
                            carouselContent={mostAnticipated.result} 
                            carouselTitle={mostAnticipated.name}
                            carouselType='smaller'
                            carouselJumps={2}
                        /> 
                    }
                    {mostAnticipated &&
                        <Carousel 
                            carouselContent={popularTrailers.result} 
                            carouselTitle={popularTrailers.name}
                            carouselType='video'
                            carouselJumps={0}
                        /> 
                    }
                </div>
                <div className='flex-col right-homepage'>
                    {topGamesOfThisYear &&
                        <RankList 
                            listContent={topGamesOfThisYear.result} 
                            listName={topGamesOfThisYear.name}
                        />
                    }
                    {topGamesOfLastYear &&
                        <RankList 
                            listContent={topGamesOfLastYear.result} 
                            listName={topGamesOfLastYear.name}
                        />
                    }

                    {topRatedGames &&
                        <RankList 
                            listContent={topRatedGames.result} 
                            listName={topRatedGames.name}
                        />
                    }
                </div>
            </div>
        )
    }
}