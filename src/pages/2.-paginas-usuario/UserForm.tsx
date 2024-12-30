import { useState, useEffect } from 'react';
import './Forms.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function UserForm() {
  const [formData, setFormData] = useState({
    rutUsuario: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    telefone: 0,
    direccion: '',
    idComuna: 0,
    codigoPostal: '',
    idPerfil: 2,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const userData = location.state?.user; 
    if (userData) {
      setFormData({
        rutUsuario: userData.rutUsuario,
        name: userData.name,
        lastname: userData.lastname,
        email: userData.email,
        password: '',
        telefone: userData.telefone,
        direccion: userData.direccion,
        idComuna: userData.idComuna,
        codigoPostal: userData.codigoPostal,
        idPerfil: userData.idPerfil,
      });
      setIsEditing(true);
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      const response = await fetch(`http://3.142.12.50:4000/usuarios/gestion/update/${data.rutUsuario}`, {
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
        <label>Nombres</label>
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
        <label>Apellidos</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className={errors.lastname ? 'error' : ''}
        />
        {errors.lastname && <p className="error-message">{errors.lastname}</p>}
      </div>
      <div className="form-group">
        <label>Cédula de Identidad</label>
        <input
          type="text"
          name="rutUsuario"
          value={formData.rutUsuario}
          onChange={handleChange}
          className={errors.rutUsuario ? 'error' : ''}
        />
        {errors.rutUsuario && <p className="error-message">{errors.rutUsuario}</p>}
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
      <div className="form-group">
        <label>Teléfono</label>
        <input
          type="number"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          className={errors.telefone ? 'error' : ''}
        />
        {errors.telefone && <p className="error-message">{errors.telefone}</p>}
      </div>
      <div className="form-group">
        <label>Dirección</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          className={errors.direccion ? 'error' : ''}
        />
        {errors.direccion && <p className="error-message">{errors.direccion}</p>}
      </div>
      <div className="form-group">
        <label>Comuna</label>
        <select name='idComuna' id='idComuna' value={formData.idComuna} onChange={handleSelectChange}>
          <option value={0}>Seleccione una comuna</option>
          <option value={1}>Santiago</option>
          <option value={2}>Providencia</option>
          <option value={3}>Las Condes</option>
        </select>
        {errors.idComuna && <p className="error-message">{errors.idComuna}</p>}
      </div>
      <div className="form-group">
        <label>Código Postal</label>
        <input
          type="text"
          name="codigoPostal"
          value={formData.codigoPostal}
          onChange={handleChange}
          className={errors.codigoPostal ? 'error' : ''}
        />
        {errors.codigoPostal && <p className="error-message">{errors.codigoPostal}</p>}
      </div>
      <button type="submit" className="submit-button">{isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}</button>
    </form>
  );
}
