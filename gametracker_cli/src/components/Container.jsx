import React, { Component } from 'react'
import Routes from '../routes'
import Header from './fixed/nav/Header.jsx'
import PageHeader from './fixed/PageHeader.jsx'

import Footer from './fixed/Footer.jsx'
import { fetchHomepageGames } from '../services/igdbCalls'

import '../css/base/Container.css'

export default class Container extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      pageHeader: null,

      // default
      // imageArrLength: 30,
      imageToDisplayIndex: 0,

      basePageClass: 'page-container'
    }
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
      // const imageArr = this.makeBackgroundImageArray(resp[4].result)

      return { 
        homepageData: resp,
        // backgroundImageScreenshots: imageArr,
    }})
  }

  // makeBackgroundImageArray = (arr) => (
  //   arr.map(game => (
  //       game.artworks[0].image_id
  //   ))
  // )

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


  // this changes page-container class when game page is mounted, uses the whole width of the page remove border+shadow.
  handleBasePageClass = (mountCheck) => {
    console.log('arrived', mountCheck)
    this.setState({ basePageClass: mountCheck ? 'page-container gamepage-container' : 'page-container'});
  }

  render() {
    const { 
      user, 
      homepageData, 
    } = this.state
    console.log(this.state)
    return (
      <>
        <Header user={user} setUser={this.setUser} />
          <div className='flex-col page-background'>
            <PageHeader pageHeader={`Welcome`}/>
            <div className={`${this.state.basePageClass}`}>
              <Routes
                homepageData={homepageData}
                setPageHeader={this.setPageHeader}
                user={user}
                setUser={this.setUser}
                // addTrack={this.addTrack}
                clearUser={this.clearUser}

                handleBasePageClass={this.handleBasePageClass}
                />
              </div>
          </div>
        <Footer />
      </>
    )
  }
}
