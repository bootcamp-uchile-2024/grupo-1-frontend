import React, { useState } from 'react';
import './SidebarFilter.css';

interface FilterProps {
  onFilterChange: (filterName: string, value: string | boolean) => void;
}

const SidebarFilters: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleClearFilters = () => {
    onFilterChange('clear', '');
    setActiveFilter(null); // Limpia todos los filtros activos
  };

  return (
    <aside className="sidebar-filters">
      <h4>Resultados</h4>

      {/* Dificultad de cuidado */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Dificultad')}>
          <span>Dificultad de cuidado</span>
          <span>{activeFilter === 'Dificultad' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Dificultad' && (
          <div className="filter-options">
            <label><input type="checkbox" onChange={() => onFilterChange('dificultad', 'principiante')} /> Principiante</label>
            <label><input type="checkbox" onChange={() => onFilterChange('dificultad', 'plantoper')} /> Plantoper</label>
            <label><input type="checkbox" onChange={() => onFilterChange('dificultad', 'experto')} /> Experto</label>
          </div>
        )}
      </div>

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
              onChange={(e) => onFilterChange('precio', e.target.value)}
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
            <label><input type="checkbox" onChange={() => onFilterChange('petfriendly', 'si')} /> Sí</label>
            <label><input type="checkbox" onChange={() => onFilterChange('petfriendly', 'no')} /> No</label>
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
            <label><input type="checkbox" onChange={() => onFilterChange('ubicacion', 'interior')} /> Interior</label>
            <label><input type="checkbox" onChange={() => onFilterChange('ubicacion', 'exterior')} /> Exterior</label>
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
            <label><input type="checkbox" onChange={() => onFilterChange('tamano', 'pequena')} /> Pequeña</label>
            <label><input type="checkbox" onChange={() => onFilterChange('tamano', 'mediana')} /> Mediana</label>
            <label><input type="checkbox" onChange={() => onFilterChange('tamano', 'grande')} /> Grande</label>
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
