import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SidebarCart from '../components/SidebarCart';
import { useState } from 'react';
import './MainLayout.css';

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  // Función para abrir y cerrar el sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="layout-container">
      {/* Pasamos la función toggleSidebar al Navbar para abrir el sidebar */}
      <Navbar onToggleSidebar={toggleSidebar} />
      
      {/* Pasamos el estado show y la función toggleSidebar a SidebarCart */}
      <SidebarCart show={showSidebar} toggleSidebar={toggleSidebar} />
      
      <main className="content">
        <Outlet />
      </main>
      
      {/* Asegúrate de que el footer está al final de la página */}
      <Footer />
    </div>
  );
}
