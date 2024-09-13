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
import PlantasPage from './pages/PlantasPage';
import MaceterosPage from './pages/MaceterosPage';
import SustratosPage from './pages/SustratosPage';
import FertilizantesPage from './pages/FertilizantesPage';
import ControlPlagasPage from './pages/ControlPlagasPage';
import ProductDatailPage from './pages/ProductDetailPage';
import PlantasDatailPage from './pages/PlantasDetailPage';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<HomePage/>}/>
            {/* <Route path="catalogo" element={<CatalogPage/>}/>
            <Route path="catalogo/product/:id" element={<ProductDatailPage/>}/> */}
            <Route path="plantas" element={<PlantasPage/>}/>
            <Route path="/detalle-plantas" element={<PlantasDatailPage/>}/>
            {/* <Route path="maceteros" element={<MaceterosPage/>}/>
            <Route path="fertilizantes" element={<FertilizantesPage/>}/>
            <Route path="sustratos" element={<SustratosPage/>}/>
            <Route path="control-de-plagas" element={<ControlPlagasPage/>}/> */}
            <Route path="quienes-somos" element={<AboutPage/>}/>
            <Route path="contacto" element={<ContactPage/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
