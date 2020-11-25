import React, { Component } from 'react'
import Routes from '../routes'
import Header from './nav/Header'

import '../css/Container.css'

export default class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      pageHeader: null
    }
  }

  async componentDidMount() {
    this.fetchUserFromStorage()

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
    console.log('yo')
    this.setState({ user })
  }

  clearUser = () => {
    this.setState({ user: null })
  }

  render() {
    const { user } = this.state
    return (
      <>
        {/* <Header user={user} {...this.props} setUser={this.setUser} /> */}
        <Header user={user} setUser={this.setUser} />
        <main classHeader='page'>
          <Routes
            // getTracks={this.getTracks}
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
