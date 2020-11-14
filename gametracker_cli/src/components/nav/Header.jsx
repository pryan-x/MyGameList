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
  }
  
  handleBlur = (e) => {
    const currentTarget = e.currentTarget;
    // if (e.nativeEvent.explicitOriginalTarget &&
    //     e.nativeEvent.explicitOriginalTarget === e.nativeEvent.originalTarget) {
    //   return;
    // }
      // ANOTHER WORKAROUND
  //   console.log('fire')
  //   if (this.state.dropdown) {
  //     setTimeout(() => {
  //       this.setState({ dropdown: false });
  //     }, 100);
  //   }

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({ dropdown: false });
      }
    }, 0)
  }


 

  render() {
    const { user } = this.props
    return (
      <div className="flex-col">
        <div className='flex nav-top'>
          <TopNav user={user} handleToggle={this.handleToggle} handleBlur={this.handleBlur} dropdownCheck={this.state.dropdown}
          />
        </div>
      </div>
    )
  }
}

export default Header
