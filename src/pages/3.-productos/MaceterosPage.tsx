import React from 'react';
import DataFetcher from '../../components/DataFetcher';

const MaceterosPage: React.FC = () => {
  return (
    <div>
      <h1>Catálogo de Maceteros</h1>
      <DataFetcher tipo="maceteros" /> {}
    </div>
  );
};

export default MaceterosPage;
