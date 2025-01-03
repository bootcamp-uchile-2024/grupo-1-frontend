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
  const [productos, setProductos] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const API_URL = `http://3.142.12.50:4000/productos/catalogo?page=${page}&size=200`;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }

      const productos = await response.json();
      console.log('Productos:', productos); // Inspeccionar la respuesta
      console.log(typeof productos)

      setProductos(productos)

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
      const response = await fetch(`http://3.142.12.50:4000/productos/create${idProducto}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
      setProductos((prevProducts: any[]) => prevProducts.filter((product: { idProducto: number; }) => product.idProducto !== idProducto));
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
          <li key={productos?.data[0].id}>
            <img src={productos?.data[0].imagenes[0].urlImagen} alt={productos.nombreProducto} style={{ width: '50px' }} />
            <h3>{productos.nombreProducto}</h3>
            <p>Precio: ${productos.precioNormal}</p>
            <p>Descripción: {productos.descripcionProducto}</p>
            <p>Stock: {productos.stock}</p>
            <button onClick={() => handleEdit(productos.idProducto)}>Editar</button>
            <button onClick={() => handleDelete(productos.idProducto)}>Eliminar</button>
          </li>
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
