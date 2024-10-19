import { useState } from 'react';
import './Forms.css'

export default function ProductForm() {
  // Definir un tipo para los datos del formulario
  type FormData = {
    nombreProducto: string;
    nombreCientifico?: string;
    imagenProducto: File | null;
    descuento?: string;
    precioNormal: string;
    coberturaDeDespacho?: string;
    stock: string;
    descripcionProducto: string;
    categoria: string;
    habitat?: string;
    luz?: string;
    frecuenciaDeRiego?: string;
    fertilizanteSugerido?: string;
    humedadIdeal?: string;
    temperaturaIdeal?: string;
    toxicidadParaMascotas?: string;
    tipoDeSuelo?: string;
    dificultadDeCuidado?: string;
  };

  // Definir un tipo para los errores
  type FormErrors = {
    nombreProducto?: string;
    imagenProducto?: string;
    precioNormal?: string;
    descripcionProducto?: string;
  };

  // Inicializar el estado con el tipo definido
  const [formData, setFormData] = useState<FormData>({
    nombreProducto: '',
    nombreCientifico: '',
    imagenProducto: null,
    descuento: '',
    precioNormal: '',
    coberturaDeDespacho: '',
    stock: '',
    descripcionProducto: '',
    categoria: '',
    habitat: '',
    luz: '',
    frecuenciaDeRiego: '',
    fertilizanteSugerido: '',
    humedadIdeal: '',
    temperaturaIdeal: '',
    toxicidadParaMascotas: '',
    tipoDeSuelo: '',
    dificultadDeCuidado: '',
  });

  // Inicializar el estado de errores con el tipo definido
  const [errors, setErrors] = useState<FormErrors>({});

  // Función para manejar los cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name === 'imagenProducto') {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const file = target.files[0];
        if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
          setFormData({ ...formData, imagenProducto: file });
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            imagenProducto: 'El archivo debe ser una imagen válida (JPEG o PNG)',
          }));
          setFormData({ ...formData, imagenProducto: null });
        }
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.nombreProducto || formData.nombreProducto.length < 3) {
      newErrors.nombreProducto = 'El nombre del producto es obligatorio y debe tener al menos 3 caracteres';
    }
    if (!formData.imagenProducto) {
      newErrors.imagenProducto = 'Debes subir una imagen del producto';
    }
    if (!formData.precioNormal || isNaN(Number(formData.precioNormal)) || Number(formData.precioNormal) <= 0) {
      newErrors.precioNormal = 'El precio normal es obligatorio y debe ser un número positivo';
    }
    if (!formData.descripcionProducto || formData.descripcionProducto.length < 10) {
      newErrors.descripcionProducto = 'La descripción del producto es obligatoria y debe tener al menos 10 caracteres';
    }
    return newErrors;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Datos enviados:', formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Creación de Productos</h2>
      
      <div>
        <label>Nombre del Producto</label>
        <input
          type="text"
          name="nombreProducto"
          value={formData.nombreProducto}
          onChange={handleChange}
        />
        {errors.nombreProducto && <p>{errors.nombreProducto}</p>}
      </div>

      <div>
        <label>Nombre Científico</label>
        <input
          type="text"
          name="nombreCientifico"
          value={formData.nombreCientifico}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Imagen del Producto</label>
        <input
          type="file"
          name="imagenProducto"
          accept="image/jpeg, image/png"
          onChange={handleChange}
        />
        {errors.imagenProducto && <p>{errors.imagenProducto}</p>}
      </div>

      <div>
        <label>Descuento</label>
        <input
          type="text"
          name="descuento"
          value={formData.descuento}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Precio Normal</label>
        <input
          type="text"
          name="precioNormal"
          value={formData.precioNormal}
          onChange={handleChange}
        />
        {errors.precioNormal && <p>{errors.precioNormal}</p>}
      </div>

      <div>
        <label>Cobertura de Despacho</label>
        <select name="coberturaDeDespacho" value={formData.coberturaDeDespacho} onChange={handleChange}>
          <option value="">Seleccione una opción</option>
          <option value="Región Metropolitana">Región Metropolitana</option>
          <option value="Región de Ohiggins">Región de Ohiggins</option>
          <option value="Región de Valparaíso">Región de Valparaíso</option>
          <option value="Todo el país">Todo el país</option>
        </select>
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

      <div>
        <label>Descripción del Producto</label>
        <textarea
          name="descripcionProducto"
          value={formData.descripcionProducto}
          onChange={handleChange}
        />
        {errors.descripcionProducto && <p>{errors.descripcionProducto}</p>}
      </div>

      <div>
        <label>Categoría</label>
        <select name="categoria" value={formData.categoria} onChange={handleChange}>
          <option value="">Seleccione una categoría</option>
          <option value="1">Plantas</option>
          <option value="2">Maceteros</option>
          <option value="3">Sustratos</option>
          <option value="4">Fertilizantes</option>
          <option value="5">Control de Plagas</option>
        </select>
      </div>

      <div>
        <label>Hábitat</label>
        <select name="habitat" value={formData.habitat} onChange={handleChange}>
          <option value="">Seleccione un hábitat</option>
          <option value="Interior">Interior</option>
          <option value="Exterior">Exterior</option>
          <option value="Interior o exterior">Interior o Exterior</option>
        </select>
      </div>

      <div>
        <label>Luz</label>
        <select name="luz" value={formData.luz} onChange={handleChange}>
          <option value="">Seleccione el nivel de luz</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      <div>
        <label>Frecuencia de Riego</label>
        <select name="frecuenciaDeRiego" value={formData.frecuenciaDeRiego} onChange={handleChange}>
          <option value="">Seleccione la frecuencia</option>
          <option value="diario">Diario</option>
          <option value="semanal">Semanal</option>
          <option value="quincenal">Quincenal</option>
          <option value="mensual">Mensual</option>
        </select>
      </div>

      <div>
        <label>Fertilizante Sugerido</label>
        <input
          type="text"
          name="fertilizanteSugerido"
          value={formData.fertilizanteSugerido}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Humedad Ideal</label>
        <select name="humedadIdeal" value={formData.humedadIdeal} onChange={handleChange}>
          <option value="">Seleccione el nivel de humedad</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <div>
        <label>Temperatura Ideal (°C)</label>
        <input
          type="text"
          name="temperaturaIdeal"
          value={formData.temperaturaIdeal}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Toxicidad para Mascotas</label>
        <select name="toxicidadParaMascotas" value={formData.toxicidadParaMascotas} onChange={handleChange}>
          <option value="">Seleccione una opción</option>
          <option value="Si">Sí</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <label>Tipo de Suelo</label>
        <select name="tipoDeSuelo" value={formData.tipoDeSuelo} onChange={handleChange}>
          <option value="">Seleccione el tipo de suelo</option>
          <option value="Arenoso">Arenoso</option>
          <option value="Arcilloso">Arcilloso</option>
          <option value="Limoso">Limoso</option>
          <option value="Turba">Turba</option>
        </select>
      </div>

      <div>
        <label>Dificultad de Cuidado</label>
        <select name="dificultadDeCuidado" value={formData.dificultadDeCuidado} onChange={handleChange}>
          <option value="">Seleccione la dificultad</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      <button type="submit">Crear Producto</button>
    </form>
  );
}
