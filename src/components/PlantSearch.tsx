import React, { useState } from 'react';

interface Product {
  id: string;
  nombreProducto: string;
  precioNormal: number;
  imagenProducto: string[];
}

const PlantSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado del término de búsqueda
  const [results, setResults] = useState<Product[]>([]); // Resultados de búsqueda
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert('Por favor, ingresa un término de búsqueda');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://13.51.162.121:4000/productos/catalogo?page=1&size=200&nombreProducto=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error('Error al buscar productos');
      }

      const data = await response.json();

      if (data.data) {
        const mappedResults: Product[] = data.data.map((item: any) => ({
          id: item.id,
          nombreProducto: item.nombreProducto,
          precioNormal: item.precioNormal,
          imagenProducto: item.imagenes?.map((img: any) => img.urlImagen) || [],
        }));

        setResults(mappedResults);
      } else {
        setResults([]);
        setError('No se encontraron resultados');
      }
    } catch (err) {
      setError('Error al conectar con la API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Buscar Plantas</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar plantas..."
          style={{ padding: '8px', width: '300px' }}
        />
        <button onClick={handleSearch} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Buscar
        </button>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {results.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
            <img
              src={product.imagenProducto[0] || '/default-image.png'}
              alt={product.nombreProducto}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h4 style={{ marginTop: '10px' }}>{product.nombreProducto}</h4>
            <p>${product.precioNormal.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantSearch;
