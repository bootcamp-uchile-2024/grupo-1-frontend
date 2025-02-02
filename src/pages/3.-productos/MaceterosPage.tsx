import React, { useState } from 'react';
import DataFetcher from '../../components/DataFetcher';
import SidebarFilters from './SidebarFilter';

const MaceterosPage: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});

  const handleFilterChange = (filterName: string, value: string | boolean) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Barra lateral de filtros */}
      <SidebarFilters onFilterChange={handleFilterChange} />
      
      <div style={{ marginLeft: '20px', flex: 1 }}>
        <h1>Catálogo de Maceteros</h1>
        
        {/* DataFetcher */}
        <DataFetcher tipo="maceteros" filters={filters} toggleSidebar={function (): void {
          throw new Error('Function not implemented.');
        } } />
      </div>
    </div>
  );
};

export default MaceterosPage;
