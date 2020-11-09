import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

render() {
    let {user} = this.props
    console.log('user: ', user)
    if (user === null) {
        user = {}
        user.username = 'pepe'
    }
    return (
        <div >
        <h1>
            Welcome {user.username}
        </h1>
        </div>
    )
    }
}


export default Home;