import React, { Component } from 'react'
import Routes from '../routes'
import Header from './nav/Header'
import { fetchHomepageGames } from '../services/igdbCalls'

import '../css/Container.css'

export default class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      pageHeader: null
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('homepage')) {
      this.fetchHomepageData()
    }
  }
  componentWillMount() {
    // localStorage.removeItem('homepage')
    this.fetchUserFromStorage()
    this.homepageDataLocalStorage()
  }

  fetchHomepageData = async () => {
    const resp = await fetchHomepageGames()
    localStorage.setItem('homepage', JSON.stringify(resp))
    this.setState({
      homepageData: resp
    })
    console.log('setstate homepagedata and localstorage')
  }

  homepageDataLocalStorage = () => {
    if (localStorage.getItem('homepage')) {
      this.setState({
        homepageData: JSON.parse(localStorage.getItem('homepage'))
      })
      console.log('gotlocalstorage homepagedata')
    } else {
      this.fetchHomepageData()
    }
    
  }

  fetchUserFromStorage = () => {
    // const user =  JSON.parse( localStorage.getItem('user') )
    // const user =  localStorage.getItem('user')
    // console.log(user)
    
    if (!this.state.user) {
      this.setState({
        // user: localStorage.getItem('user')
        user: JSON.parse(localStorage.getItem('user'))
      })
      console.log('got user from localstorage')
    }
  }
  // fetchTracks = async () => {
  //   try {
  //     const tracks = await getTracks()
  //     this.setState({ tracks })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  // addTrack = track => this.setState({ tracks: [...this.state.tracks, track] })

  setUser = user => {
    console.log('user logged in')
    this.setState({ user })
  }

  clearUser = () => {
    this.setState({ user: null })
    console.log('user logged out')
  }

  render() {
    const { user } = this.state
    return (
      <>
        {/* <Header user={user} {...this.props} setUser={this.setUser} /> */}
        <Header user={user} setUser={this.setUser} />
        <main>
          <Routes
            homepageData={this.state.homepageData}
            setPageHeader={this.setPageHeader}
            user={user}
            setUser={this.setUser}
            // addTrack={this.addTrack}
            clearUser={this.clearUser}
          />
        </main>
      </>
    )
  }
}
