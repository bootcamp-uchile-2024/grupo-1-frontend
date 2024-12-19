import { useState, useEffect } from 'react';
import './Forms.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function UserForm() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const userData = location.state?.user; 
    if (userData) {
      setFormData({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: '', 
      });
      setIsEditing(true);
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      if (isEditing) {
        await updateUser(formData);
      } else {
        await createUser(formData);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const createUser = async (data: typeof formData) => {
    try {
      const response = await fetch('http://3.142.12.50:4000/usuarios/gestion/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
      alert('Usuario creado exitosamente');
      navigate('/gestion-usuarios');
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (data: typeof formData) => {
    try {
      const response = await fetch(`http://3.142.12.50:4000/usuarios/gestion/update/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
      alert('Usuario actualizado exitosamente');
      navigate('/gestion-usuarios');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</h2>
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      <button type="submit" className="submit-button">{isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}</button>
    </form>
  );
}
