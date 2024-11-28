import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  nombreProducto: string;
  precioNormal: number;
  descripcionProducto: string;
  imagenProducto: string[];
  stock: number;
}

const CreateProduct: React.FC = () => {
  const [productData, setProductData] = useState<Product>({
    nombreProducto: '',
    precioNormal: 0,
    descripcionProducto: '',
    imagenProducto: [],
    stock: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Para redirigir después de crear un producto

  // Maneja el cambio de valor en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Maneja el cambio en el campo de imágenes
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      imagenProducto: value.split(',').map(url => url.trim()), // Convierte las URLs separadas por coma en un array
    }));
  };

  // Maneja el envío del formulario para crear el producto
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://16.171.43.137:4000/productos/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      const result = await response.json();
      console.log(result); // Verifica el producto creado
      alert('Producto creado exitosamente');
      navigate('/product-management'); // Redirige a la página de gestión de productos
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

  return (
    <div>
      <h2>Crear Producto</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>Nombre del Producto:</label>
          <input
            type="text"
            name="nombreProducto"
            value={productData.nombreProducto}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Precio Normal:</label>
          <input
            type="number"
            name="precioNormal"
            value={productData.precioNormal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcionProducto"
            value={productData.descripcionProducto}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Imagen(es) del Producto (separadas por comas):</label>
          <input
            type="text"
            name="imagenProducto"
            value={productData.imagenProducto.join(', ')} // Para manejar múltiples imágenes
            onChange={handleImageChange}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreateProduct;
