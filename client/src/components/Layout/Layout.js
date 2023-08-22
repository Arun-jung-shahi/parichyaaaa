// import React, { Children } from 'react'
import Header from './Header'
import Footer from './Footer'
import './css/Layout.css'
import {Toaster} from 'react-hot-toast'
// import { Outlet } from 'react-router-dom'

const Layout = ({children}) => {
  return (
    <>
    <Header/>
      {/* <main className="main"> */}
      <main style={{ minHeight: "70vh" }}>
      <Toaster/>
        {children}
        
      </main>

    <Footer/>
    </>
  )
}

export default Layout
