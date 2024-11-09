import React from 'react';
import DataFetcher from '../../components/DataFetcher';

const ControlPlagasPage: React.FC = () => {
  return (
    <div>
      <h1>Catálogo de Control de Plagas</h1>
      <DataFetcher tipo="controlPlagas" toggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } /> {}
    </div>
  );
};

export default ControlPlagasPage;
