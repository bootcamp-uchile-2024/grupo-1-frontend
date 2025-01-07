import React, { useState } from 'react';
import './SidebarFilter.css';

interface FilterProps {
  onFilterChange: (filterName: string, value: string | boolean) => void;
}

const SidebarFilters: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [,setFilters] = useState({
    dificultad: '',
    precio: '',
    petfriendly: '',
    ubicacion: '',
    tamano: '',
    cuidados: '', // Agregar estado para cuidados
  });

  // Función para hacer la solicitud al endpoint de filtros
  const fetchFilteredProducts = async (filters: any) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`http://3.142.12.50:4000/productos/plantas/filtrocuidados?${queryParams}`);
      const data = await response.json();
      console.log(data); // Aquí puedes manejar la respuesta del servidor
    } catch (error) {
      console.error("Error al obtener los productos filtrados:", error);
    }
  };

  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleFilterChange = (filterName: string, value: string | boolean) => {
    // Actualiza el estado de los filtros
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [filterName]: value };
      // Llama a la función para hacer la solicitud con los filtros actualizados
      fetchFilteredProducts(updatedFilters);
      return updatedFilters;
    });
    onFilterChange(filterName, value); // Llama al callback para mantener la lógica original
  };

  const handleClearFilters = () => {
    setFilters({
      dificultad: '',
      precio: '',
      petfriendly: '',
      ubicacion: '',
      tamano: '',
      cuidados: '', // Limpiar el estado de cuidados
    });
    onFilterChange('clear', '');
    setActiveFilter(null);
    fetchFilteredProducts({}); // Hacer la solicitud con filtros vacíos para obtener todos los productos
  };

  return (
    <aside className="sidebar-filters">
      <h4>Resultados</h4>

     

      {/* Precio */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Precio')}>
          <span>Precio</span>
          <span>{activeFilter === 'Precio' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Precio' && (
          <div className="filter-options">
            <input
              type="range"
              min="500"
              max="100000"
              onChange={(e) => handleFilterChange('precio', e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Petfriendly */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Petfriendly')}>
          <span>Petfriendly</span>
          <span>{activeFilter === 'Petfriendly' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Petfriendly' && (
          <div className="filter-options">
            <label><input type="checkbox" onChange={() => handleFilterChange('petfriendly', 'si')} /> Sí</label>
            <label><input type="checkbox" onChange={() => handleFilterChange('petfriendly', 'no')} /> No</label>
          </div>
        )}
      </div>

      {/* Cuidados */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Cuidados')}>
          <span>Cuidados</span>
          <span>{activeFilter === 'Cuidados' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Cuidados' && (
          <div className="filter-options">
            <label><input type="checkbox" onChange={() => handleFilterChange('cuidados', 'facil')} /> Fácil</label>
            <label><input type="checkbox" onChange={() => handleFilterChange('cuidados', 'moderada')} /> Moderada</label>
            <label><input type="checkbox" onChange={() => handleFilterChange('cuidados', 'dificil')} /> Difícil</label>
          </div>
        )}
      </div>

      {/* Ubicación */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Ubicacion')}>
          <span>Ubicación ideal</span>
          <span>{activeFilter === 'Ubicacion' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Ubicacion' && (
          <div className="filter-options">
            <label><input type="checkbox" onChange={() => handleFilterChange('ubicacion', 'interior')} /> Interior</label>
            <label><input type="checkbox" onChange={() => handleFilterChange('ubicacion', 'exterior')} /> Exterior</label>
          </div>
        )}
      </div>

      {/* Tamaño */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Tamaño')}>
          <span>Tamaño</span>
          <span>{activeFilter === 'Tamaño' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Tamaño' && (
          <div className="filter-options">
            <label><input type="checkbox" onChange={() => handleFilterChange('tamano', 'pequena')} /> Pequeña</label>
            <label><input type="checkbox" onChange={() => handleFilterChange('tamano', 'mediana')} /> Mediana</label>
            <label><input type="checkbox" onChange={() => handleFilterChange('tamano', 'grande')} /> Grande</label>
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="filter-buttons">
        <button className="clear-filters-button" onClick={handleClearFilters}>Limpiar filtros</button>
        <button className="apply-filters-button">Buscar productos</button>
      </div>
    </aside>
  );
};

export default SidebarFilters;
