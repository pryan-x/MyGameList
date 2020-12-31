import React, { Component } from 'react'
import Routes from '../routes'
import Header from './fixed/nav/Header.jsx'
import PageHeader from './fixed/PageHeader.jsx'
import BackgroundImage from './fixed/BackgroundImage.jsx'
import PageWrapper from './fixed/PageWrapper.jsx'
import Footer from './fixed/Footer.jsx'
import { fetchHomepageGames } from '../services/igdbCalls'

import '../css/Container.css'

export default class Container extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      pageHeader: null,

      // default
      // imageArrLength: 30,
      imageToDisplayIndex: 0,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //Really it's a deeper equality check, not just the props/state object
    return this.props !== nextProps || this.state !== nextState;
  }

  componentDidMount() {
    console.log('main container mounted')

    // reset local data
    // localStorage.removeItem('homepage')


    this.baseFetchSetState()
    
    this.fetchUserFromStorage()
  }

  baseFetchSetState = async () => {
    let resp
    if (localStorage.getItem('homepage')) {
      resp = JSON.parse(localStorage.getItem('homepage'))
      console.log('gotlocalstorage homepagedata')
    } else {
      resp = await fetchHomepageGames()
      localStorage.setItem('homepage', JSON.stringify(resp))
    }

    this.setState(() => {
      const imageArr = this.makeBackgroundImageArray(resp[4].result)

      return { 
        homepageData: resp,
        // imageArrLength: imageArr.length,
        backgroundImageScreenshots: imageArr,
    }})
  }

  makeBackgroundImageArray = (arr) => (
    arr.map(game => (
        game.artworks[0].image_id
    ))
  )

  fetchUserFromStorage = () => {
    if (!this.state.user) {
      this.setState({
        // user: localStorage.getItem('user')
        user: JSON.parse(localStorage.getItem('user'))
      })
      console.log('got user from localstorage')
    }
  }

  // login 
  setUser = user => {
    this.setState({ user })
    console.log('user logged in')
  }

  // logout
  clearUser = () => {
    this.setState({ user: null })
    console.log('user logged out')
  }

  render() {
    const { 
      user, 
      homepageData, 
      backgroundImageScreenshots 
    } = this.state
    console.log(this.state.homepageData)
    return (
      <>
        {/* <Header user={user} {...this.props} setUser={this.setUser} /> */}
        <Header user={user} setUser={this.setUser} />
        {/* <main> */}
          <PageWrapper backgroundImages={backgroundImageScreenshots} >
            {/* {
              backgroundImageScreenshots && <BackgroundImage images={backgroundImageScreenshots}/>
            } */}
            <PageHeader pageHeader={`Welcome`}/>
            <Routes
              homepageData={homepageData}
              setPageHeader={this.setPageHeader}
              user={user}
              setUser={this.setUser}
              // addTrack={this.addTrack}
              clearUser={this.clearUser}
            />
          </PageWrapper>
        {/* </main> */}
        <Footer />
      </>
    )
  }
}
