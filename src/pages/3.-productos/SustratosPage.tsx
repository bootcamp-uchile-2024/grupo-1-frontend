import React from 'react';
import DataFetcher from '../../components/DataFetcher';

const SustratosPage: React.FC = () => {
  return (
    <div>
      <h1>Catálogo de Sustratos</h1>
      <DataFetcher tipo="sustratos" toggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } /> {}
    </div>
  );
};

export default SustratosPage;
