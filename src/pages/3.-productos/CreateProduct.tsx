import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    nombreProducto: '',
    precio: 0,
    descripcionProducto: '',
    imagenProducto: '',
    stock: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Planta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
      navigate('/gestion-productos');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    }
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Producto</label>
          <input
            type="text"
            name="nombreProducto"
            value={formData.nombreProducto}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción</label>
          <input
            type="text"
            name="descripcionProducto"
            value={formData.descripcionProducto}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="text"
            name="imagenProducto"
            value={formData.imagenProducto}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreateProduct;
