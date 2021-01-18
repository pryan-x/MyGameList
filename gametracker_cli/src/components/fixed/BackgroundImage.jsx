import React, { Component } from 'react'


export default class BackgroundImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: props.images,

      // default
      imageArrLength: props.images.length,
    //   prevImage
      imageToDisplayIndex: 0,
    }
  }

  componentDidMount() {
    // this.interval = setInterval(() => {
      this.setState(prevState => {
        const randomIndex = Math.floor((Math.random() * this.state.imageArrLength))
        return { 
          imageToDisplayIndex: randomIndex === prevState.randomIndex 
            ? randomIndex++ 
            : randomIndex
      }})
    // }, 30000);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  render() {
    const {
        images,
        imageToDisplayIndex
    } = this.state
    console.log(images[imageToDisplayIndex])
    return (
        <div className='page-background-parallax-container'>
            <div className='shadow-parallax-fix'>

            </div>
            <div className='page-background-parallax background-image-transition-animation'
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.igdb.com/igdb/image/upload/t_original/${images[imageToDisplayIndex]}.jpg)`
                }}>
            </div>
            <div 
                className='page-background-parallax background-image-transition-animation-2'
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.igdb.com/igdb/image/upload/t_original/${images[imageToDisplayIndex]}.jpg)`
                }}
            >
            </div>
        </div>
    )
  }
}
