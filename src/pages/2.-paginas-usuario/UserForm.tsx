import { useState, useEffect } from 'react';
import './Forms.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function UserForm() {
  const [formData, setFormData] = useState({
    rutUsuario: '',
    nombres: '',
    apellidos: '',
    email: '',
    clave: '',
    telefono: '',
    direccion: '',
    idComuna: '',
    codigoPostal: '',
    idPerfil: 2,
    respuesta1: "Respuesta 1",
    respuesta2: "Respuesta 2",
    respuesta3: "Respuesta 3",
    respuesta4: "Respuesta 4",
    respuesta5: "Respuesta 5",
    respuesta6: "Respuesta 6",
    respuesta7: "Respuesta 7",
    respuesta8: "Respuesta 8",
    respuesta9: "Respuesta 9"
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
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        email: userData.email,
        clave: '',
        telefono: userData.telefono,
        direccion: userData.direccion,
        idComuna: userData.idComuna,
        codigoPostal: userData.codigoPostal,
        idPerfil: userData.idPerfil,
        respuesta1: userData.respuesta1,
        respuesta2: userData.respuesta2,
        respuesta3: userData.respuesta3,
        respuesta4: userData.respuesta4,
        respuesta5: userData.respuesta5,
        respuesta6: userData.respuesta6,
        respuesta7: userData.respuesta7,
        respuesta8: userData.respuesta8,
        respuesta9: userData.respuesta9
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
    if (!formData.nombres || formData.nombres.length < 3) {
      newErrors.nombres = 'El nombre debe tener al menos 3 caracteres';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.clave || formData.clave.length < 6) {
      newErrors.clave = 'La contraseña debe tener al menos 6 caracteres';
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
    console.log(data);
    const body = {...data,telefono:parseInt(data.telefono),idComuna:parseInt(data.idComuna)};
    console.log(body);
    try {
      const response = await fetch('http://3.142.12.50:4000/usuarios/gestion/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          className={errors.nombres ? 'error' : ''}
        />
        {errors.nombres && <p className="error-message">{errors.nombres}</p>}
      </div>
      <div className="form-group">
        <label>Apellidos</label>
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          className={errors.apellidos ? 'error' : ''}
        />
        {errors.apellidos && <p className="error-message">{errors.apellidos}</p>}
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
          name="clave"
          value={formData.clave}
          onChange={handleChange}
          className={errors.clave ? 'error' : ''}
        />
        {errors.clave && <p className="error-message">{errors.clave}</p>}
      </div>
      <div className="form-group">
        <label>Teléfono</label>
        <input
          type="number"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          // className={errors.telefono ? 'error' : ''}
        />
        {/* {errors.telefono && <p className="error-message">{errors.telefono}</p>} */}
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
