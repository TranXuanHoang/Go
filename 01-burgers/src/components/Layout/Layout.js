import React, { Component, Fragment } from 'react'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedhandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState, props) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  }

  render() {
    return (
      <Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedhandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

export default Layout
