import React, { useState } from 'react';
import DataFetcher from '../../components/DataFetcher';
import SidebarFilters from './SidebarFilter'; 

const SustratosPage: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});

  const handleFilterChange = (filterName: string, value: string | boolean) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Barra lateral de filtros */}
      <SidebarFilters onFilterChange={handleFilterChange} />

      {/* Contenido principal */}
      <div style={{ marginLeft: '20px', flex: 1 }}>
        <h1>Catálogo de Sustratos</h1>
        <DataFetcher tipo="sustratos" filters={filters} />
      </div>
    </div>
  );
};

export default SustratosPage;
