import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    nombreProducto: '',
    imagenProducto: [],
    imagen1: '' as any,
    imagen2: '' as any,
    imagen3: '' as any,
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

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('formData:', formData);
    const body = {...formData,imagenProducto:[formData.imagen1,formData.imagen2,formData.imagen3], precioNormal: parseInt(formData.precioNormal), stock: parseInt(formData.stock), idCategoria: parseInt(formData.idCategoria), descuento: parseInt(formData.descuento)};
    delete body.imagen1;
    delete body.imagen2;
    delete body.imagen3;
    console.log('body:', body);
    e.preventDefault();
    try {
      const response = await fetch('http://3.142.12.50:4000/productos/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const base64 = await convertFileToBase64(file);
    setFormData({ ...formData, [event.target.name]: base64 });
  }

  const convertFileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = (error) => reject(error);
    });
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
            name="imagen1"
            onChange={handleFileUpload}
          />
        </div>
        <div>
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
        </div>

        <button type="submit">Crear Producto</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreateProduct;
