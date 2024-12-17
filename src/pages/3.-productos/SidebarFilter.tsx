import React, { useState } from 'react';
import './SidebarFilter.css';

interface FilterProps {
  onFilterChange: (filterName: string, value: any) => void;
  onSearch: () => void;
  onClearFilters: () => void;
}

const SidebarFilters: React.FC<FilterProps> = ({ onFilterChange, onSearch, onClearFilters }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([500, 100000]);

  const toggleFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handlePriceChange = (index: number, value: number) => {
    const updatedRange = [...priceRange];
    updatedRange[index] = value;
    setPriceRange(updatedRange);
    onFilterChange('priceRange', updatedRange);
  };

  return (
    <aside className="sidebar-filters">
      <h4>Filtrar productos</h4>

      {/* Dificultad de Cuidado */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Dificultad')}>
          <span>Dificultad de cuidado</span>
          <span>{activeFilter === 'Dificultad' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Dificultad' && (
          <div className="filter-options">
            <label><input type="radio" name="dificultad" onChange={() => onFilterChange('dificultad', 'Principiante')} /> Principiante</label>
            <label><input type="radio" name="dificultad" onChange={() => onFilterChange('dificultad', 'Plantoper')} /> Plantoper</label>
            <label><input type="radio" name="dificultad" onChange={() => onFilterChange('dificultad', 'Experto')} /> Experto</label>
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
            <label>
              Desde:
              <input
                type="number"
                value={priceRange[0]}
                min={500}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              />
            </label>
            <label>
              Hasta:
              <input
                type="number"
                value={priceRange[1]}
                max={100000}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              />
            </label>
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
            <label><input type="radio" name="petfriendly" onChange={() => onFilterChange('petfriendly', 'Si')} /> Sí</label>
            <label><input type="radio" name="petfriendly" onChange={() => onFilterChange('petfriendly', 'No')} /> No</label>
          </div>
        )}
      </div>

      {/* Ubicación Ideal */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Ubicacion')}>
          <span>Ubicación ideal</span>
          <span>{activeFilter === 'Ubicacion' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Ubicacion' && (
          <div className="filter-options">
            <label><input type="radio" name="ubicacion" onChange={() => onFilterChange('ubicacion', 'Interior')} /> Interior</label>
            <label><input type="radio" name="ubicacion" onChange={() => onFilterChange('ubicacion', 'Exterior')} /> Exterior</label>
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
            <label><input type="radio" name="tamaño" onChange={() => onFilterChange('tamaño', 'Pequeña')} /> Pequeña</label>
            <label><input type="radio" name="tamaño" onChange={() => onFilterChange('tamaño', 'Mediana')} /> Mediana</label>
            <label><input type="radio" name="tamaño" onChange={() => onFilterChange('tamaño', 'Grande')} /> Grande</label>
          </div>
        )}
      </div>

      {/* Insumos */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleFilter('Insumos')}>
          <span>Insumos</span>
          <span>{activeFilter === 'Insumos' ? '−' : '+'}</span>
        </div>
        {activeFilter === 'Insumos' && (
          <div className="filter-options">
            <label><input type="checkbox" onChange={() => onFilterChange('insumos', 'Maceteros')} /> Maceteros</label>
            <label><input type="checkbox" onChange={() => onFilterChange('insumos', 'Sustratos')} /> Sustratos</label>
            <label><input type="checkbox" onChange={() => onFilterChange('insumos', 'Fertilizantes')} /> Fertilizantes</label>
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="filter-buttons">
        <button className="clear-button" onClick={onClearFilters}>Limpiar filtros</button>
        <button className="search-button" onClick={onSearch}>Buscar productos</button>
      </div>
    </aside>
  );
};

export default SidebarFilters;
