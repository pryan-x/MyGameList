import React, { Component } from 'react';
import PageHeader from '../shared/PageHeader'
import Carosel from '../shared/Carosel'
import { fetchHomepageGames } from '../../services/igdbCalls'

import '../../css/Home.css'


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    // componentDidMount = () => {
    //     console.log(this.props.homepageGames)
    // }

    render() {
        console.log(this.props.homepageGames)
        const { homepageGames } = this.props
        return (
            <>
                <PageHeader pageHeader={`Welcome`} />
                <div className='flex homepage-container'>
                    <div className='flex-col left-homepage'>
                        {homepageGames ? <Carosel games={homepageGames[3]}/> : null}
                        {homepageGames ? <Carosel games={homepageGames[4]}/> : null}
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