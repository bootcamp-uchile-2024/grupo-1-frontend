import React from 'react';
import DataFetcher from '../../components/DataFetcher';

const PlantasPage: React.FC = () => {
  return (
    <div>
      <h1>Catálogo de Plantas</h1>
      <DataFetcher tipo="plantas" toggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } /> {}
    </div>
  );
};

export default PlantasPage;
