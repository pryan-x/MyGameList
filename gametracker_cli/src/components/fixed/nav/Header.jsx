import React from 'react'
import TopNav from './TopNav'


class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false
    }
  }

  handleToggle = (e) => {
    // e.target.focus();
    this.setState(prevState=>({ dropdown: !prevState.dropdown }));
    console.log('dropdown toggled')
  }
  
  handleBlur = (e) => {
    const currentTarget = e.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({ dropdown: false });
      }
      console.log('dropdown toggled')
    }, 0)
  }


 

  render() {
    const { user } = this.props
    return (
      <div className="flex-col nav">
        <div className='flex nav-top'>
          <TopNav user={user} handleToggle={this.handleToggle} handleBlur={this.handleBlur} dropdownCheck={this.state.dropdown}
          />
        </div>
      </div>
    )
  }
}

export default Header
