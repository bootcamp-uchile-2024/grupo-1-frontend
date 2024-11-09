import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  nombreProducto: string;
  precio: number;
  descripcionProducto: string;
  imagenProducto: string;
  stock: number;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // Para paginación
  const [totalPages, setTotalPages] = useState<number>(1); // Total de páginas disponibles


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Planta${page}`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages); 
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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Planta${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id: string) => {
    window.location.href = `/edit-product/${id}`;
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
        {products.map(product => (
          <li key={product.id}>
            <img src={product.imagenProducto} alt={product.nombreProducto} style={{ width: '50px' }} />
            <h3>{product.nombreProducto}</h3>
            <p>Precio: ${product.precio}</p>
            <p>Descripción: {product.descripcionProducto}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => handleEdit(product.id)}>Editar</button>
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
          </li>
        ))}
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
