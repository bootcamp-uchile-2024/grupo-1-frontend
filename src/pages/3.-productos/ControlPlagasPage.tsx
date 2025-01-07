import React, { useState } from 'react';
import DataFetcher from '../../components/DataFetcher';

const ControlPlagasPage: React.FC = () => {
  const [filters] = useState<Record<string, string | boolean>>({});

  const toggleSidebar = () => {
    console.log('Sidebar toggled'); // Aquí puedes implementar la funcionalidad del sidebar si lo necesitas
  };

  return (
    <div>
      <h1>Catálogo de Control de Plagas</h1>
      <DataFetcher tipo="controlPlagas" filters={filters} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default ControlPlagasPage;
