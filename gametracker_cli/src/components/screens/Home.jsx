import React, { Component } from 'react';
import PageHeader from '../shared/PageHeader'


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
        <>
            <PageHeader pageHeader={`Welcome`} />
        <h1>
            Welcome {user.username}
        </h1>
        </>
    )
    }
}


export default Home;