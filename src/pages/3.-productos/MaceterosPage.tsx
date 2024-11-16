import React from 'react';
import DataFetcher from '../../components/DataFetcher';

const MaceterosPage: React.FC = () => {
  return (
    <div>
      <h1>Catálogo de Maceteros</h1>
      <DataFetcher tipo="maceteros" toggleSidebar={function (): void {
        throw new Error('Function not implemented.');
      } } /> {}
    </div>
  );
};

export default MaceterosPage;
