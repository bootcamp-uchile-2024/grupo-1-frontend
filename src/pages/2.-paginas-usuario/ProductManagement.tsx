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
  const [products, setProducts] = useState<Product[]>([]); // Inicializar como array vacío
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // Para paginación
  const [totalPages, setTotalPages] = useState<number>(1); // Total de páginas disponibles

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Planta&page=${page}`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      // Asegúrate de que 'data.products' sea un array
      if (data && Array.isArray(data)) {
        setProducts(data);
        // Total pages no está en esta API, solo mostramos los productos
        setTotalPages(1); // Ajustar según lo que la API devuelva, si hay paginación
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
      const response = await fetch(`https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Planta/${idProducto}`, {
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
        {Array.isArray(products) && products.length > 0 ? ( // Verifica que products sea un array con elementos
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
          <p>No hay productos disponibles.</p> // Mensaje cuando no hay productos
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
