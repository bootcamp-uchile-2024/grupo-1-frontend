import React, { useState } from 'react';
import SidebarFilters from './SidebarFilter';
import DataFetcher from '../../components/DataFetcher';
import ProductCard from '../../components/ProductCard';

const PlantasPage: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleFilterChange = (filterName: string, value: string | boolean) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidebarFilters onFilterChange={handleFilterChange} />

      <div style={{ marginLeft: '20px', flex: 1 }}>
        <h1>Catálogo de Plantas</h1>

        <DataFetcher
          tipo="plantas"
          filters={filters}
          renderItem={(products) => {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedProducts = products.slice(startIndex, endIndex);

            return (
              <>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                  {paginatedProducts.map((product) => {
                    console.log(product);
                    return (

                      <ProductCard
                        id={product.id}
                        nombreProducto={product.nombreProducto}
                        precio={product.precio}
                        stock={product.stock}
                        imagenProducto={product.imagenProducto}
                        categoria={product.categoria} />

                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ margin: '0 10px', padding: '5px 10px' }}
                  >
                    Anterior
                  </button>
                  <span>Página {currentPage}</span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={paginatedProducts.length < itemsPerPage}
                    style={{ margin: '0 10px', padding: '5px 10px' }}
                  >
                    Siguiente
                  </button>
                </div>
              </>
            );
          } } toggleSidebar={function (): void {
            throw new Error('Function not implemented.');
          } }        />
      </div>
    </div>
  );
};

export default PlantasPage;