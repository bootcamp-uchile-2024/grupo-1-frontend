import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductManagement.css';


const ProductManagement: React.FC = () => {
  const [productos, setProductos] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages] = useState<number>(1);

  const API_URL = `http://3.142.12.50:4000/productos/catalogo?page=${page}&size=200`;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const productos = await response.json();
      setProductos(productos);
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

  const handleDelete = async (id: number) => {
    console.log(id);
    try {
      const response = await fetch(`http://3.142.12.50:4000/productos/${id}/deshabilitar`, {
        method: 'PATCH',
        body: JSON.stringify({ "activo": 0 }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
      setProductos((prevProducts: any[]) =>
        prevProducts.filter((product: { id: number }) => product.id !== id)
      );
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="loading-message">Cargando...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="product-management-container">
      <h2 className="product-management-title">Gestión de Productos</h2>
      <div className="add-product-container">
        <Link to="/create-product">
          <button className="add-product-button">Agregar Producto</button>
        </Link>
      </div>
      <ul className="product-list">
        {productos?.data.map((producto: any) => (
          <li key={producto?.id} className="product-item">
            <img
              src={
                producto?.imagenes[0]?.urlImagen?.includes('uploads')
                  ? `http://3.142.12.50:4000${producto?.imagenes[0]?.urlImagen}`
                  : producto?.imagenes[0]?.urlImagen
              }
              alt={producto.nombreProducto}
              className="product-management-image"
            />  
            <h3 className="product-name">{producto.nombreProducto}</h3>
            <p className="product-price">Precio: ${producto.precioNormal}</p>
            <p className="product-description">{producto.descripcionProducto}</p>
            <p className="product-stock">Stock: {producto.stock}</p>
            <button
              onClick={() => handleDelete(producto.id)}
              className="delete-product-button"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="pagination-container">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          className="pagination-button"
        >
          Anterior
        </button>
        <span className="pagination-info">{`Página ${page} de ${totalPages}`}</span>
        <button
          onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          className="pagination-button"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ProductManagement;