import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveAppBar from './ResponsiveAppBar'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
        <ResponsiveAppBar />
        <Outlet />
        <Footer /> 
    </>
  )
}

export default Layout