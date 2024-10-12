import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <>
        {/* <div><Header /></div> */}
        {/* <div><Nav /></div> */}
        <div><Navbar /></div>
        <main>
          <Outlet />
        </main>
        <Footer />
    </>
  )
}
