import React, { useState } from 'react';
import SidebarFilters from './SidebarFilter';
import DataFetcher from '../../components/DataFetcher';

const PlantasPage: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});

  const handleFilterChange = (filterName: string, value: string | boolean) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidebarFilters onFilterChange={handleFilterChange} />
      <div style={{ marginLeft: '20px', flex: 1 }}>
        <h1>Catálogo de Plantas</h1>
        <DataFetcher tipo="plantas" filters={filters} toggleSidebar={() => console.log('Toggle sidebar')} />
      </div>
    </div>
  );
};

export default PlantasPage;