import React, { Component } from 'react';
import PageHeader from '../shared/PageHeader'
import Carosel from '../shared/Carosel'
// import { fetchHomepageGames } from '../../services/igdbCalls'

import '../../css/Home.css'


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            caroselGames: props.homepageGames,
            [props.homepageGames[3].name]: props.homepageGames[3],
            [props.homepageGames[4].name]: props.homepageGames[4],
            // when there was an issue with passing props check
            // [props.homepageGames && props.homepageGames[3].name]: props.homepageGames && props.homepageGames[3],
            // [props.homepageGames && props.homepageGames[4].name]: props.homepageGames && props.homepageGames[4],
            animationClass: '',
            animationType: '',
        }
    }  
    
    componentDidMount = () => {
        // console.log('fired')
        // console.log(this.props.homepageGames)
        // if (this.props.homepageGames) {
        //     this.setState({ 
        //         caroselGames: this.props.homepageGames,
        //         topGamesofLastYear: this.props.homepageGames[3],
        //         popularRecentReleases: this.props.homepageGames[4],
        //     });
        // }
    }

    //returns a new array with the items shifted
    shiftLeft = (arr) => {
        const shiftedArr = arr
        shiftedArr.push(shiftedArr.shift())
        return shiftedArr
    }
    shiftRight = (arr) => {
        const shiftedArr = arr
        shiftedArr.unshift(shiftedArr.pop())
        return shiftedArr
    }
    shiftRightStyles = () => {
        return {
            right: '(18% + 8px)',
            transition: 'left 1s'
        }
    }
    shiftCarosel = (e) => {
        // check to see if animation is running
        // come back later to refactor this check if unefficient
        if(this.state.animationClass!='') {
            return
        }
        // grabs attribute name for state reference
        const caroselToShift = e.currentTarget.getAttribute('name')
        // grabs classname for caroselshift direction check
        const directionToShift = e.currentTarget.getAttribute('class')

        this.setState(prevState => {
            // copys state object dynamically
            const newCarosel = prevState[caroselToShift]

            // reassigns result array in state object to new array from either function
            // checks classname for ternery right or left function
            newCarosel.result = directionToShift.includes('right') ? 
            this.shiftRight(newCarosel.result) :
            this.shiftLeft(newCarosel.result)
            // returns new state object dynamically
            return {
                [caroselToShift]: newCarosel,
                animationClass: `${caroselToShift}`,
                animationType: directionToShift.includes('right')
                ? 'right'
                : 'left'
            }
        }, () => {

            setTimeout(() => {
                this.setState({ 
                      animationClass: '',
                      animationType: ''
                });
              }, 
            // has to be same time as keyframes animation for the shift
              500)
        })
    }


    render() {
        console.log('homepage rendered')

        // if errors out write check for props 
        const { 
            // dynamic state deconstructor, variable is the value
            [this.props.homepageGames[3].name] : topGamesOfLastYear,
            [this.props.homepageGames[4].name] : popularRecentReleases,
        } = this.state

        return (
            <>
                <PageHeader pageHeader={`Welcome`} />
                <div className='flex homepage-container'>
                    <div className='flex-col left-homepage'>
                        {/* {this.props.homepageGames ? <Carosel games={this.props.homepageGames[3]} shiftCarosel={this.shiftCarosel}/> : null}
                        {this.props.homepageGames ? <Carosel games={this.props.homepageGames[4]} shiftCarosel={this.shiftCarosel}/> : null} */}
                        {topGamesOfLastYear &&
                            <Carosel 
                                caroselContent={topGamesOfLastYear.result} 
                                caroselName={topGamesOfLastYear.name}
                                shiftCarosel={this.shiftCarosel}
                                animationClass={this.state.animationClass}
                                animationType={this.state.animationType}
                            /> 
                        }
                        {popularRecentReleases && 
                            <Carosel 
                                caroselContent={popularRecentReleases.result} 
                                caroselName={popularRecentReleases.name}
                                shiftCarosel={this.shiftCarosel}
                                animationClass={this.state.animationClass}
                                animationType={this.state.animationType}


                            />
                        }
                    </div>
                    <div className='flex-col right-homepage'>
                        <p className='ex'>column here</p>
                    </div>
                </div>
            </>
        )
    }
}


export default Home;