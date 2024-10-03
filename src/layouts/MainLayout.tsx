import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Content from '../components/Content'
import { Outlet } from 'react-router-dom'
import { UserInfo } from '../components/UserInfo'

export default function MainLayout() {
  return (
    <>
        {/* <div><Header /></div> */}
        <div><Nav /></div>
        <main>
          <Outlet />
        </main>
        <Footer />
    </>
  )
}
