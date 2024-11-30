import React, { useState } from 'react';
import DataFetcher from '../../components/DataFetcher';

const FertilizantesPage: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});

  const toggleSidebar = () => {
    console.log('Sidebar toggled'); // Aquí puedes implementar la funcionalidad del sidebar si lo necesitas
  };

  return (
    <div>
      <h1>Catálogo de Fertilizantes</h1>
      <DataFetcher tipo="fertilizantes" filters={filters} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default FertilizantesPage;
