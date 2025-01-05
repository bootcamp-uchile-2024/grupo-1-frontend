import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    nombreProducto: '',
    imagenes: [] as File[],
    descuento: '',
    precioNormal: '',
    stock: '',
    descripcionProducto: '',
    idCategoria: '',
    activo: 1,
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new FormData();
    (Object.keys(formData) as (keyof typeof formData)[]).forEach((key) => {
      if (key !== 'imagenes') {
        body.append(key, formData[key].toString());
      }
    });
    formData.imagenes.forEach((imagen: File) => {
      body.append('imagenes', imagen);
    });
    try {
      const response = await fetch('http://3.142.12.50:4000/productos/newcreate', {
        method: 'POST',
        body,
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFormData({ ...formData, imagenes: [...formData.imagenes, file] }); // Update state with the selected file
  };
  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}
        action='http://3.142.12.50:4000/productos/newcreate'
        method='POST'
        encType='multipart/form-data'      
      >
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
            name="precioNormal"
            value={formData.precioNormal}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descuento</label>
          <input
            type="number"
            name="descuento"
            value={formData.descuento}
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
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
        <label>Categoría</label>
        <select name='idCategoria' id='idCategoria' value={formData.idCategoria} onChange={handleSelectChange}>
          <option value='0'>Seleccione...</option>
          <option value='1'>Plantas</option>
          <option value='2'>Control de Plagas</option>
          <option value='3'>Maceteros</option>
          <option value='4'>Sustratos</option>
          <option value='5'>Fertilizantes</option>
          <option value='6'>Servicio</option>
          <option value='7'>Decoración</option>
          <option value='8'>Accesorios</option>
          <option value='9'>Semillas</option>
          <option value='10'>Otros</option>
        </select>
        </div>
        <div>
          <label>Imagen 1</label>
          <input
            accept='image/*'
            type="file"
            name="imagenes"
            onChange={handleFileUpload}
          />
        </div>
        {/* <div>
          <label>Imagen 2</label>
          <input
            accept='image/*'
            type="file"
            name="imagen2"
            onChange={handleFileUpload}
          />
        </div>
        <div>
          <label>Imagen 3</label>
          <input
            accept='image/*'
            type="file"
            name="imagen3"
            onChange={handleFileUpload}
          />
        </div> */}

        <button type="submit">Crear Producto</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreateProduct;