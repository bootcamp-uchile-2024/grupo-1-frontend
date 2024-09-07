import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './layouts/MainLayout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="catalog" element={<CatalogPage/>}/>
            <Route path="about" element={<AboutPage/>}/>
            <Route path="contact" element={<ContactPage/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
