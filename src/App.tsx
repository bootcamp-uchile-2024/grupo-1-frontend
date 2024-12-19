import './App.css';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/1.-paginas principales/HomePage';
import AboutPage from './pages/1.-paginas principales/AboutPage';
import ContactPage from './pages/1.-paginas principales/ContactPage';
import PlantasDetailPage from './pages/4.-detalle-productos/PlantasDetailPage';
import AdminPage from './pages/2.-paginas-usuario/AdminPage';
import { PrivateRoute } from './components/PrivateRoute';
import ProductForm from './pages/2.-paginas-usuario/ProductForm';
import UserForm from './pages/2.-paginas-usuario/UserForm';
import MaceterosPage from './pages/3.-productos/MaceterosPage';
import SustratosPage from './pages/3.-productos/SustratosPage';
import { LogInPage } from './pages/1.-paginas principales/LogInPage';
import ControlPlagasPage from './pages/3.-productos/ControlPlagasPage';
import FertilizantesPage from './pages/3.-productos/FertilizantesPage';
import PlantasPage from './pages/3.-productos/PlantasPage';
import { CartProvider } from './CartContext';
import CartPage from './pages/1.-paginas principales/CartPage';
import MaceterosDetailPage from './pages/4.-detalle-productos/MaceterosDetailPage';
import FertilizantesDetailPage from './pages/4.-detalle-productos/FertilizantesDetailPage';
import ControlPlagasDetailPage from './pages/4.-detalle-productos/ControlPlagasDetailPage';
import UserManagement from './pages/2.-paginas-usuario/UserManagement';
import ProductManagement from './pages/2.-paginas-usuario/ProductManagement';
import CreateProduct from './pages/3.-productos/CreateProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import SustratosDetailPage from './pages/4.-detalle-productos/SustratosDetailPage';
import SearchResultsPage from './pages/4.-detalle-productos/SearchResultsPage'; 

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="plantas" element={<PlantasPage />} />
            <Route path="buscar" element={<SearchResultsPage />} /> {/* Nueva ruta */}
            <Route path="/productos/plantas/getbyid/:id" element={<PlantasDetailPage />} />
            <Route path="maceteros" element={<MaceterosPage />} />
            <Route path="/productos/maceteros/getbyid/:id" element={<MaceterosDetailPage toggleSidebar={function (): void {
              throw new Error('Function not implemented.');
            } } />} />
            <Route path="fertilizantes" element={<FertilizantesPage />} />
            <Route path="/productos/fertilizantes/getbyid/:id" element={<FertilizantesDetailPage toggleSidebar={function (): void {
              throw new Error('Function not implemented.');
            } } />} />
            <Route path="sustratos" element={<SustratosPage />} />
            <Route path="/productos/sustratos/getbyid/:id" element={<SustratosDetailPage toggleSidebar={function (): void {
              throw new Error('Function not implemented.');
            } } />} />
            <Route path="control-de-plagas" element={<ControlPlagasPage />} />
            <Route path="carrito" element={<CartPage />} />
            <Route path="quienes-somos" element={<AboutPage />} />
            <Route path="contacto" element={<ContactPage />} />
            <Route path="formulario-usuario" element={<UserForm />} />
            <Route path="gestion-usuarios" element={<UserManagement />} />
            <Route path="gestion-productos" element={<ProductManagement />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="admin" element={<PrivateRoute roles={["admin"]}><AdminPage /></PrivateRoute>}>
              <Route index element={<ProductForm />} />
            </Route>
            <Route path="login" element={<LogInPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
