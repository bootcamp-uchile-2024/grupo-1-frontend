import { useState } from 'react';

export default function ProductForm() {
    // Definir un tipo para los datos del formulario
  type FormData = {
    name: string;
    description: string;
    price: string;
    stock: string;
  };

  // Definir un tipo para los errores
  type FormErrors = {
    name?: string;
    price?: string;
    stock?: string;
  };
  // Inicializar el estado con el tipo definido
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  // Inicializar el estado de errores con el tipo definido
  const [errors, setErrors] = useState<FormErrors>({});

  // Función para manejar los cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'El nombre del producto debe tener al menos 3 caracteres';
    }
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser un número positivo';
    }
    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'El stock debe ser un número entero positivo';
    }

    return newErrors;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Enviar datos si no hay errores
      console.log('Datos enviados:', formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div><h2>Creación de Productos</h2></div>
      <div>
        <label>Nombre del Producto</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label>Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Precio</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <p>{errors.price}</p>}
      </div>

      <div>
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
        {errors.stock && <p>{errors.stock}</p>}
      </div>

      <button type="submit">Crear Producto</button>
    </form>
  );
}
