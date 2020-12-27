import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const sideDrawerClosedhandler = () => {
    setShowSideDrawer(false)
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  }

  return (
    <Fragment>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedhandler} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)
