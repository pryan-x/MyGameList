import React, { Component } from 'react';

import { fetchGamepageGame } from '../../services/igdbCalls'

import '../../css/Gamepage.css'


export default class GamePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
    }

    componentDidMount = () => {
        // pass false when mounting
        this.props.handleBasePageClass(true)
        this.fetchGameData()
    }
    componentWillUnmount = () => {
        // pass true when unmounting
        this.props.handleBasePageClass()
    }

    fetchGameData = async () => {
        const gameid = this.props.match.params.gameid
        const resp = await fetchGamepageGame(gameid)
        console.log(resp)
    }

    render () {
//  const url = this.props.routeParams.page;
//  const PageComponent = data.find(page => page.link === url).property;
        console.log(this.props.match.params.gameid)
        console.log(this.props)

        return(
            <div className='flex-col gamepage'></div>
        )
    }
}