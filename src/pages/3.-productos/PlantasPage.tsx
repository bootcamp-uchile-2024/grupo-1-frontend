import React, { useState } from 'react';
import SidebarFilters from './SidebarFilter';
import DataFetcher from '../../components/DataFetcher';
import ProductCard from '../../components/ProductCard'; // Importa el componente ProductCard

const PlantasPage: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});

  const handleFilterChange = (filterName: string, value: string | boolean) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Barra lateral de filtros */}
      <SidebarFilters onFilterChange={handleFilterChange} />

      <div style={{ marginLeft: '20px', flex: 1 }}>
        <h1>Catálogo de Plantas</h1>

        {/* DataFetcher que utiliza ProductCard */}
        <DataFetcher
          tipo="plantas"
          filters={filters}
          toggleSidebar={() => console.log('Toggle sidebar')}
          renderItem={(product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              nombreProducto={product.nombreProducto}
              precio={product.precio}
              stock={product.stock}
              imagenProducto={product.imagenProducto}
              categoria={product.categoria}
            />
          )}
        />
      </div>
    </div>
  );
};

export default PlantasPage;
