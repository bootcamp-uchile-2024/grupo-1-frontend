import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Content from '../components/Content'

export default function MainLayouts() {
  return (
    <>
        <Header />
        <Nav />
        <div className="content">
          <Sidebar />
          <Content />
        </div>
        <Footer />
    </>
  )
}
