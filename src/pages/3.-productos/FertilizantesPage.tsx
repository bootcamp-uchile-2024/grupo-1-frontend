import React from 'react';
import DataFetcher from '../../components/DataFetcher';

const FertilizantesPage: React.FC = () => {
  return (
    <div>
      <h1>Catálogo de Fertilizantes</h1>
      <DataFetcher tipo="fertilizantes" /> {}
    </div>
  );
};

export default FertilizantesPage;
