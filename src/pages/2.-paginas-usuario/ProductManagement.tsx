import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  idProducto: number;
  nombreProducto: string;
  precioNormal: number;
  descripcionProducto: string;
  imagenProducto: string[];
  stock: number;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const API_URL = `http://16.171.43.137:4000/productos/catalogo?page=${page}&size=200`;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }

      const data = await response.json();

      console.log('Respuesta de la API:', data); // Inspeccionar la respuesta

      // Verificar si la respuesta es un array o si los productos están dentro de una propiedad
      if (Array.isArray(data)) {
        setProducts(data);
        setTotalPages(1); // Ajustar según lo que la API devuelva, si hay paginación
      } else if (data.products && Array.isArray(data.products)) {
        // Si los productos están dentro de una propiedad llamada 'products'
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 200)); // Si la API devuelve un total de productos
      } else {
        throw new Error('Los productos no están disponibles');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (idProducto: number) => {
    try {
      const response = await fetch(`http://16.171.43.137:4000/productos/catalogo/${idProducto}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
      setProducts(prevProducts => prevProducts.filter(product => product.idProducto !== idProducto));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (idProducto: number) => {
    window.location.href = `/edit-product/${idProducto}`;
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <div>
        <Link to="/create-product">
          <button>Agregar Producto</button>
        </Link>
      </div>
      <ul>
        {Array.isArray(products) && products.length > 0 ? (
          products.map(product => (
            <li key={product.idProducto}>
              <img src={product.imagenProducto[0]} alt={product.nombreProducto} style={{ width: '50px' }} />
              <h3>{product.nombreProducto}</h3>
              <p>Precio: ${product.precioNormal}</p>
              <p>Descripción: {product.descripcionProducto}</p>
              <p>Stock: {product.stock}</p>
              <button onClick={() => handleEdit(product.idProducto)}>Editar</button>
              <button onClick={() => handleDelete(product.idProducto)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </ul>
      <div>
        <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>Anterior</button>
        <span>{`Página ${page} de ${totalPages}`}</span>
        <button onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))}>Siguiente</button>
      </div>
    </div>
  );
};

export default ProductManagement;
