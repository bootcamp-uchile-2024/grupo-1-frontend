import React from 'react';
import DataFetcher from '../../components/DataFetcher';

const SustratosPage: React.FC = () => {
  return (
    <div>
      <h1>Catálogo de Sustratos</h1>
      <DataFetcher tipo="sustratos" /> {}
    </div>
  );
};

export default SustratosPage;
