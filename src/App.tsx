// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './layouts/MainLayout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/1.-paginas principales/HomePage'
import AboutPage from './pages/1.-paginas principales/AboutPage'
import ContactPage from './pages/1.-paginas principales/ContactPage'
import PlantasDatailPage from './pages/4.-detalle-productos/PlantasDetailPage';
import { AdminPage } from './pages/2.-paginas-usuario/AdminPage';
import { PrivateRoute } from './components/PrivateRoute';
import ProductForm  from './pages/2.-paginas-usuario/ProductForm';
import UserForm from './pages/2.-paginas-usuario/UserForm';
import MaceterosPage from './pages/3.-productos/MaceterosPage';
import SustratosPage from './pages/3.-productos/SustratosPage';
import { LogInPage } from './pages/1.-paginas principales/LogInPage';
import ControlPlagasPage from './pages/3.-productos/ControlPlagasPage';
import FertilizantesPage from './pages/3.-productos/FertilizantesPage';
import PlantasPage from './pages/3.-productos/PlantasPage';

function App() {
  

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
            <Route path="/admin" element={<PrivateRoute roles={["admin"]}><AdminPage/></PrivateRoute>}>
              <Route index element={<ProductForm/>}/>
            </Route>
            <Route path="/login" element={<LogInPage/>}/>
            <Route path="maceteros" element={<MaceterosPage/>}/>
            <Route path="fertilizantes" element={<FertilizantesPage/>}/>
            <Route path="sustratos" element={<SustratosPage/>}/>
            <Route path="control-de-plagas" element={<ControlPlagasPage/>}/>
            <Route path="quienes-somos" element={<AboutPage/>}/>
            <Route path="contacto" element={<ContactPage/>}/>
            <Route path="formulario-usuario" element={<UserForm/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
