import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Content from '../components/Content'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
        <Header />
        <Nav />
        <main>
          <Outlet />
        </main>
        <Footer />
    </>
  )
}
