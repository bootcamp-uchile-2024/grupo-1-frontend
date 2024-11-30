import React, { useState } from 'react';
import './SidebarFilter.css'

interface FilterProps {
  onFilterChange: (filterName: string, value: string | boolean) => void;
}

const SidebarFilters: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <aside className="sidebar-filters">
      <h4>5 resultados</h4>
      <h2>Petfriendly</h2>

      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Nivel de cuidado')}>
          <span>Nivel de cuidado</span>
          <span>{activeFilter === 'Nivel de cuidado' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Nivel de cuidado' && (
          <div className="filter-options">
            {/* Opciones de filtro */}
          </div>
        )}
      </div>

      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Mascotas')}>
          <span>Mascotas</span>
          <span>{activeFilter === 'Mascotas' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Mascotas' && (
          <div className="filter-options">
            <label>
              <input
                type="checkbox"
                onChange={(e) => onFilterChange('toxicidadParaMascotas', !e.target.checked)}
              />
              Plantas Petfriendly
            </label>
            <label>
              <input
                type="checkbox"
                onChange={(e) => onFilterChange('toxicidadParaMascotas', e.target.checked)}
              />
              Tóxicas para mascotas
            </label>
          </div>
        )}
      </div>

      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Ubicación')}>
          <span>Ubicación</span>
          <span>{activeFilter === 'Ubicación' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Ubicación' && (
          <div className="filter-options">
            {/* Opciones de filtro */}
          </div>
        )}
      </div>

      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Tamaño')}>
          <span>Tamaño</span>
          <span>{activeFilter === 'Tamaño' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Tamaño' && (
          <div className="filter-options">
            {/* Opciones de filtro */}
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarFilters;
