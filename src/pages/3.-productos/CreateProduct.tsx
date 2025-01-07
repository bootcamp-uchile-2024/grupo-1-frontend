import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePlantForm: React.FC = () => {
    interface FormData {
        nombrePlanta: string;
        nombreCientifico: string;
        precio: string;
        precioNormal: string;
        stock: string;
        activo: string;
        temperaturaIdeal: string;
        toxicidadMascotas: string;
        tamanoMaximo: string;
        peso: string;
        habitat: string;
        luz: string;
        frecuenciaDeRiego: string;
        humedadIdeal: string;
        dificultadDeCuidado: string;
        estacion: string[];
        fertilizantesSugeridos: string[];
        sustratosSugeridos: string[];
        tipoSuelo: string[];
        imagenes: File[];
    }

    const [formData, setFormData] = useState<FormData>({
        nombrePlanta: '',
        nombreCientifico: '',
        precio: '',
        precioNormal: '',
        stock: '',
        activo: '1',
        temperaturaIdeal: '',
        toxicidadMascotas: '1',
        tamanoMaximo: '',
        peso: '',
        habitat: '',
        luz: '',
        frecuenciaDeRiego: '',
        humedadIdeal: '',
        dificultadDeCuidado: '',
        estacion: [],
        fertilizantesSugeridos: [],
        sustratosSugeridos: [],
        tipoSuelo: [],
        imagenes: []
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

    const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, options } = e.target;
        const selectedValues = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setFormData({ ...formData, [name]: selectedValues });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setFormData({ ...formData, imagenes: [...formData.imagenes, ...files] });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'imagenes') {
                formData.imagenes.forEach(file => body.append('imagenes', file));
            } else if (Array.isArray(formData[key as keyof FormData])) {
                (formData[key as keyof FormData] as string[]).forEach(value => body.append(key, value));
            } else {
                body.append(key, formData[key as keyof FormData] as string);
            }
        });

        try {
            const response = await fetch('http://3.142.12.50:4000/productos/plantas/newcreate', {
                method: 'POST',
                body
            });

            const result = await response.json();
            if (response.ok) {
                alert(`Planta creada exitosamente: ${result.message}`);
                navigate('/gestion-productos');
            } else {
                throw new Error(result.message);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error desconocido');
            }
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
            <h1>Crear Nueva Planta</h1>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }} onSubmit={handleSubmit}>
                <label htmlFor="nombrePlanta">Nombre de la Planta:</label>
                <input type="text" id="nombrePlanta" name="nombrePlanta" value={formData.nombrePlanta} onChange={handleChange} required />

                <label htmlFor="nombreCientifico">Nombre Científico:</label>
                <input type="text" id="nombreCientifico" name="nombreCientifico" value={formData.nombreCientifico} onChange={handleChange} required />

                <label htmlFor="precio">Precio:</label>
                <input type="number" id="precio" name="precio" value={formData.precio} onChange={handleChange} required />

                <label htmlFor="precioNormal">Precio Normal:</label>
                <input type="number" id="precioNormal" name="precioNormal" value={formData.precioNormal} onChange={handleChange} required />

                <label htmlFor="stock">Stock:</label>
                <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required />

                <label htmlFor="activo">Activo:</label>
                <select id="activo" name="activo" value={formData.activo} onChange={handleChange}>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                </select>

                <label htmlFor="temperaturaIdeal">Temperatura Ideal (°C):</label>
                <input type="text" id="temperaturaIdeal" name="temperaturaIdeal" value={formData.temperaturaIdeal} onChange={handleChange} required />

                <label htmlFor="toxicidadMascotas">Toxicidad para Mascotas:</label>
                <select id="toxicidadMascotas" name="toxicidadMascotas" value={formData.toxicidadMascotas} onChange={handleChange}>
                    <option value="1">Tóxica</option>
                    <option value="0">No Tóxica</option>
                </select>

                <label htmlFor="tamanoMaximo">Tamaño Máximo (cm):</label>
                <input type="text" id="tamanoMaximo" name="tamanoMaximo" value={formData.tamanoMaximo} onChange={handleChange} required />

                <label htmlFor="peso">Peso (kg):</label>
                <input type="text" id="peso" name="peso" value={formData.peso} onChange={handleChange} required />

                <label htmlFor="habitat">Hábitat:</label>
                <select id="habitat" name="habitat" value={formData.habitat} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    <option value="1">Interior</option>
                    <option value="2">Exterior</option>
                    <option value="3">Interior/Exterior</option>
                </select>

                <label htmlFor="luz">Tipo de Luz:</label>
                <select id="luz" name="luz" value={formData.luz} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    <option value="1">Luz directa</option>
                    <option value="2">Luz indirecta brillante</option>
                    <option value="3">Luz indirecta media</option>
                    <option value="4">Sombra</option>
                </select>

                <label htmlFor="frecuenciaDeRiego">Frecuencia de Riego:</label>
                <select id="frecuenciaDeRiego" name="frecuenciaDeRiego" value={formData.frecuenciaDeRiego} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    <option value="1">Diario</option>
                    <option value="2">Cada 2-3 días</option>
                    <option value="3">Semanal</option>
                    <option value="4">Quincenal</option>
                </select>

                <label htmlFor="humedadIdeal">Humedad Ideal:</label>
                <select id="humedadIdeal" name="humedadIdeal" value={formData.humedadIdeal} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    <option value="1">Alta</option>
                    <option value="2">Media</option>
                    <option value="3">Baja</option>
                </select>

                <label htmlFor="dificultadDeCuidado">Dificultad de Cuidado:</label>
                <select id="dificultadDeCuidado" name="dificultadDeCuidado" value={formData.dificultadDeCuidado} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    <option value="1">Fácil</option>
                    <option value="2">Moderada</option>
                    <option value="3">Difícil</option>
                </select>

                <label htmlFor="estacion">Estación Recomendada:</label>
                <select id="estacion" name="estacion" multiple value={formData.estacion} onChange={handleMultiSelectChange} required>
                    <option value="1">Primavera</option>
                    <option value="2">Verano</option>
                    <option value="3">Otoño</option>
                    <option value="4">Invierno</option>
                </select>

                <label htmlFor="fertilizantesSugeridos">Fertilizantes Sugeridos:</label>
                <select
                    id="fertilizantesSugeridos"
                    name="fertilizantesSugeridos"
                    multiple
                    value={formData.fertilizantesSugeridos}
                    onChange={handleMultiSelectChange}
                >
                    <option value="1">Fertilizante 1</option>
                    <option value="2">Fertilizante 2</option>
                    <option value="3">Fertilizante 3</option>
                </select>

                <label htmlFor="sustratosSugeridos">Sustratos Sugeridos:</label>
                <select
                    id="sustratosSugeridos"
                    name="sustratosSugeridos"
                    multiple
                    value={formData.sustratosSugeridos}
                    onChange={handleMultiSelectChange}
                >
                    <option value="1">Sustrato 1</option>
                    <option value="2">Sustrato 2</option>
                    <option value="3">Sustrato 3</option>
                </select>

                <label htmlFor="tipoSuelo">Tipo de Suelo:</label>
                <select
                    id="tipoSuelo"
                    name="tipoSuelo"
                    multiple
                    value={formData.tipoSuelo}
                    onChange={handleMultiSelectChange}
                >
                    <option value="1">Arcilloso</option>
                    <option value="2">Arenoso</option>
                    <option value="3">Franco</option>
                    <option value="4">Limoso</option>
                </select>

                <label htmlFor="imagenes">Imágenes:</label>
                <input
                    type="file"
                    id="imagenes"
                    name="imagenes"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                />

                <button type="submit" style={{ marginTop: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Crear Planta
                </button>
            </form>
        </div>
    );
};

export default CreatePlantForm;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CreateProduct: React.FC = () => {
//   const [formData, setFormData] = useState({
//     nombreProducto: '',
//     imagenes: [] as File[],
//     descuento: '',
//     precioNormal: '',
//     stock: '',
//     descripcionProducto: '',
//     idCategoria: '',
//     activo: 1,
//   });
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const body = new FormData();
//     (Object.keys(formData) as (keyof typeof formData)[]).forEach((key) => {
//       if (key !== 'imagenes') {
//         body.append(key, formData[key].toString());
//       }
//     });
//     formData.imagenes.forEach((imagen: File) => {
//       body.append('imagenes', imagen);
//     });
//     try {
//       const response = await fetch('http://3.142.12.50:4000/productos/newcreate', {
//         method: 'POST',
//         body,
//       });
//       if (!response.ok) {
//         throw new Error('Error al crear el producto');
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

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files![0];
//     setFormData({ ...formData, imagenes: [...formData.imagenes, file] }); // Update state with the selected file
//   };
//   return (
//     <div>
//       <h2>Agregar Producto</h2>
//       <form onSubmit={handleSubmit}
//         action='http://3.142.12.50:4000/productos/newcreate'
//         method='POST'
//         encType='multipart/form-data'      
//       >
//         <div>
//           <label>Nombre del Producto</label>
//           <input
//             type="text"
//             name="nombreProducto"
//             value={formData.nombreProducto}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Precio</label>
//           <input
//             type="number"
//             name="precioNormal"
//             value={formData.precioNormal}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Descuento</label>
//           <input
//             type="number"
//             name="descuento"
//             value={formData.descuento}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Descripción</label>
//           <input
//             type="text"
//             name="descripcionProducto"
//             value={formData.descripcionProducto}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Stock</label>
//           <input
//             type="number"
//             name="stock"
//             value={formData.stock}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//         <label>Categoría</label>
//         <select name='idCategoria' id='idCategoria' value={formData.idCategoria} onChange={handleSelectChange}>
//           <option value='0'>Seleccione...</option>
//           <option value='1'>Plantas</option>
//           <option value='2'>Control de Plagas</option>
//           <option value='3'>Maceteros</option>
//           <option value='4'>Sustratos</option>
//           <option value='5'>Fertilizantes</option>
//           <option value='6'>Servicio</option>
//           <option value='7'>Decoración</option>
//           <option value='8'>Accesorios</option>
//           <option value='9'>Semillas</option>
//           <option value='10'>Otros</option>
//         </select>
//         </div>
//         <div>
//           <label>Imagen 1</label>
//           <input
//             accept='image/*'
//             type="file"
//             name="imagenes"
//             onChange={handleFileUpload}
//           />
//         </div>
//         {/* <div>
//           <label>Imagen 2</label>
//           <input
//             accept='image/*'
//             type="file"
//             name="imagen2"
//             onChange={handleFileUpload}
//           />
//         </div>
//         <div>
//           <label>Imagen 3</label>
//           <input
//             accept='image/*'
//             type="file"
//             name="imagen3"
//             onChange={handleFileUpload}
//           />
//         </div> */}

//         <button type="submit">Crear Producto</button>
//       </form>
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// };

// export default CreateProduct;
