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


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface NewPlantData {
//   nombrePlanta: string;
//   nombreCientifico: string;
//   producto: {
//     nombreProducto: string;
//     descripcionProducto: string;
//     precio: number;
//     precioNormal: number;
//     stock: number;
//     activo: boolean;
//     imagenes: { id: number; urlImagen: string; file: File }[];
//   };
//   habitat: { id: number; nombre: string };
//   luz: { id: number; tipo: string };
//   humedad: { id: number; nivel: string };
//   temperaturaIdeal: number;
//   toxicidadMascotas: number;
//   tamanoMaximo: number;
//   peso: number;
//   dificultad: { id: number; nivel: string };
//   frecuencia: { id: number; tipo: string };
//   estaciones: { id: number; nombre: string }[];
//   fertilizantes: { id: number; nombre: string }[];
//   sustratos: { id: number; nombre: string }[];
//   suelos: { id: number; tipo: string }[];
// }

// const CreateProduct: React.FC = () => {
//   const [formData, setFormData] = useState<NewPlantData>({
//     nombrePlanta: '',
//     nombreCientifico: '',
//     producto: {
//       nombreProducto: '',
//       descripcionProducto: '',
//       precio: 0,
//       precioNormal: 0,
//       stock: 0,
//       activo: true,
//       imagenes: [],
//     },
//     habitat: { id: 1, nombre: '' }, // Ajusta los valores iniciales según tus datos
//     luz: { id: 1, tipo: '' },
//     humedad: { id: 1, nivel: '' },
//     temperaturaIdeal: 0,
//     toxicidadMascotas: 0,
//     tamanoMaximo: 0,
//     peso: 0,
//     dificultad: { id: 1, nivel: '' },
//     frecuencia: { id: 1, tipo: '' },
//     estaciones: [],
//     fertilizantes: [],
//     sustratos: [],
//     suelos: [],
//   });

//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files!;
//     setFormData({
//       ...formData,
//       producto: {
//         ...formData.producto,
//         imagenes: [
//           ...formData.producto.imagenes,
//           ...Array.from(files).map((file, index) => ({
//             id: formData.producto.imagenes.length + index + 1,
//             urlImagen: URL.createObjectURL(file),
//             file,
//           })),
//         ],
//       },
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const body = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key !== 'producto.imagenes') {
//         body.append(key, JSON.stringify(value));
//       } else {
//         formData.producto.imagenes.forEach((image) => {
//           body.append('imagenes', image.file);
//         });
//       }
//     });

//     try {
//       const response = await fetch('http://3.142.12.50:4000/productos/plantas/newcreate', {
//         method: 'POST',
//         body,
//       });
//       if (!response.ok) {
//         throw new Error('Error al crear la planta');
//       }
//       navigate('/gestion-productos');
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('Error desconocido');
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Agregar Nueva Planta</h2>
//       <form onSubmit={handleSubmit} action='' method='POST' encType='multipart/form-data'>
//         {/* Sección de la planta */}
//         <div>
//           <label htmlFor="nombrePlanta">Nombre de la Planta:</label>
//           <input
//             type="text"
//             id="nombrePlanta"
//             name="nombrePlanta"
//             value={formData.nombrePlanta}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="nombreCientifico">Nombre Científico:</label>
//           <input
//             type="text"
//             id="nombreCientifico"
//             name="nombreCientifico"
//             value={formData.nombreCientifico}
//             onChange={handleChange}
//           />
//         </div>
  
//         {/* Sección del producto */}
//         <h3>Información del Producto</h3>
//         <div>
//           <label htmlFor="nombreProducto">Nombre del Producto:</label>
//           <input
//             type="text"
//             id="nombreProducto"
//             name="producto.nombreProducto"
//             value={formData.producto.nombreProducto}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="descripcionProducto">Descripción del Producto:</label>
//           <input
//             id="descripcionProducto"
//             name="producto.descripcionProducto"
//             value={formData.producto.descripcionProducto}
//             onChange={handleChange}
//           />
//         </div>
//         {/* ... otros campos del producto */}
  
//         {/* Sección del hábitat */}
//         <h3>Hábitat</h3>
//         <div>
//           <label htmlFor="habitat">Hábitat:</label>
//           <select
//             id="habitat"
//             name="habitat.id"
//             value={formData.habitat.id}
//             onChange={handleChange}
//           >
//             <option value="1">Interior</option>
//             <option value="2">Exterior</option>
//             {/* ... otras opciones */}
//           </select>
//         </div>
  
//         {/* Sección de luz */}
//         <h3>Luz</h3>
//         <div>
//           <label htmlFor="luz">Luz:</label>
//           <select
//             id="luz"
//             name="luz.id"
//             value={formData.luz.id}
//             onChange={handleChange}
//           >
//             <option value="1">Luz indirecta brillante</option>
//             <option value="2">Sombra parcial</option>
//             {/* ... otras opciones */}
//           </select>
//         </div>
  
//         {/* ... otras secciones (humedad, temperatura, etc.) */}
  
//         {/* Sección de imágenes */}
//         <h3>Imágenes</h3>
//         <div>
//           <label htmlFor="imagen1">Imagen 1:</label>
//           <input
//             type="file"
//             id="imagen1"
//             name="imagenes"
//             onChange={handleFileUpload}
//           />
//         </div>
//         <div>
//           <label htmlFor="imagen2">Imagen 2:</label>
//           <input
//             type="file"
//             id="imagen2"
//             name="imagenes"
//             onChange={handleFileUpload}
//           />
//         </div>
//         <div>
//           <label htmlFor="imagen3">Imagen 3:</label>
//           <input
//             type="file"
//             id="imagen3"
//             name="imagenes"
//             onChange={handleFileUpload}
//           />
//         </div>
  
//         <h3>Estaciones</h3>
//       <div>
//         <label htmlFor="estaciones">Estaciones recomendadas:</label>
//         <select
//           id="estaciones"
//           name="estaciones"
//           multiple
//           value={formData.estaciones}
//           onChange={handleChange}
//         >
//           <option value="1">Primavera</option>
//           <option value="2">Verano</option>
//           <option value="3">Otoño</option>
//           <option value="4">Invierno</option>
//         </select>
//       </div>
  
//         {/* ... otras secciones (fertilizantes, sustratos, suelos) */}
  
//         <button type="submit">Crear Planta</button>
//       </form>
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// };

// export default CreateProduct;

