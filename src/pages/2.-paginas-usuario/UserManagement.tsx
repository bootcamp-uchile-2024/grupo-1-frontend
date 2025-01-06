import React, { useState, useEffect } from 'react';
import './UserManagement.css';

interface User {
  id?: number;
  rutUsuario?: number;
  nombres: string;
  apellidos: string;
  email: string;
  clave?: string;
  telefono: number;
  direccion: string;
  codigoPostal: number;
  comuna?: number;
  perfil?: number;
  Preferencias?: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://3.142.12.50:4000/usuarios/gestion/list');
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number | undefined) => {
    console.log(id?.toString());
    if (!id) return;
    try {
      const response = await fetch(`http://3.142.12.50:4000/usuarios/gestion/delete/${id.toString()}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!userData) return;
    try {
      const response = await fetch('http://3.142.12.50:4000/usuarios/gestion/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
      const createdUser = await response.json();
      setUsers([...users, createdUser]);
      setUserData(null);
      alert('Usuario creado exitosamente');
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al crear el usuario');
    }
  };

  const handleEdit = async () => {
    if (!userData) return;
    try {
      const response = await fetch(`http://3.142.12.50:4000/usuarios/gestion/update/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setUserData(null);
      alert('Usuario actualizado exitosamente');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev!, [name]: value }));
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) return <p className="loading-message">Cargando...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="user-management-container">
      <h2 className="user-management-title">Gestión de Usuarios</h2>
      <h3 className="form-title">{userData ? 'Editar Usuario' : 'Crear Usuario'}</h3>
      <form className="user-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={userData?.nombres || ''}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={userData?.apellidos || ''}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData?.email || ''}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={userData?.telefono || ''}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={userData?.direccion || ''}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="codigoPostal"
          placeholder="Código Postal"
          value={userData?.codigoPostal || ''}
          onChange={handleChange}
          required
          className="form-input"
        />
        <button type="submit" onClick={userData ? handleEdit : handleCreate} className="form-button">
          {userData ? 'Actualizar' : 'Crear'}
        </button>
      </form>
      <ul className="user-list">
        {currentUsers.map((user) => (
          <li key={user.id} className="user-item">
            <p>Nombre: {user.nombres}</p>
            <p>Apellidos: {user.apellidos}</p>
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.telefono}</p>
            <p>Dirección: {user.direccion}</p>
            <p>Código Postal: {user.codigoPostal}</p>
            <button onClick={() => handleDelete(user.id)} className="user-delete-button">
              Eliminar
            </button>
            <button onClick={() => setUserData(user)} className="user-edit-button">
              Editar
            </button>
          </li>
        ))}
      </ul>
      <div className="pagination-container">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="pagination-button"
        >
          Anterior
        </button>
        <span className="pagination-info">Página {currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(users.length / usersPerPage)))
          }
          className="pagination-button"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UserManagement;