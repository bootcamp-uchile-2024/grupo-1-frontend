import React from 'react';
import DataFetcher from '../../components/DataFetcher';

const FertilizantesPage: React.FC = () => {
  return (
    <div>
      <h1>Catálogo de Fertilizantes</h1>
      <DataFetcher tipo="fertilizantes" toggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } /> {}
    </div>
  );
};

export default FertilizantesPage;
