import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveAppBar from './ResponsiveAppBar'
import Footer from './Footer'

const Layout = (props) => {

  const { currentMenu, setCurrentMenu } = props

  // console.log(currentMenu, setCurrentMenu)
  return (
    <>
        <ResponsiveAppBar 
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
        />
        <Outlet />
        <Footer /> 
    </>
  )
}

export default Layout