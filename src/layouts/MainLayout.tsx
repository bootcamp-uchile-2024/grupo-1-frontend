import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

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
