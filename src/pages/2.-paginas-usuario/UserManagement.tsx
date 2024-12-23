import React, { useState, useEffect } from 'react';

interface User {
  id?: number;
  rutUsuario: number;
  nombres: string;
  apellidos: string;
  email: string;
  clave?: string;
  telefono: number;
  direccion: string;
  codigoPostal: number;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // Página actual
  const [usersPerPage] = useState<number>(10); // Número de usuarios por página

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
    if(!id) return;
    try {
      const response = await fetch(`http://3.142.12.50:4000/usuarios/gestion/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!userData) return;

    try {
      console.log('Creando usuario:', userData);  // Verificar que se están enviando los datos correctos
      const response = await fetch('http://3.142.12.50:4000/usuarios/gestion/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }

      const createdUser = await response.json();
      console.log('Usuario creado:', createdUser);  // Verificar la respuesta de la API

      // Actualiza la lista de usuarios con el nuevo usuario creado
      setUsers([...users, createdUser]);
      setUserData(null); // Limpia el formulario
      alert('Usuario creado exitosamente');
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al crear el usuario');
    }
  };

  const handleEdit = async () => {
    if (!userData) return;
    let user = {...userData};
    delete user.id
    delete user.clave
    try {
      const response = await fetch(`http://3.142.12.50:4000/usuarios/gestion/update/${userData.rutUsuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
      const updatedUser = await response.json();

      // Actualiza el estado de users con los datos del usuario actualizado
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
      );
      setUserData(null); // Limpia el formulario
      alert('Usuario actualizado exitosamente');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev!, [name]: value }));
  };

  const isEditing = userData !== null;

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Gestión de Usuarios</h2>

      <h3>{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isEditing) {
            handleEdit();
          } else {
            handleCreate();
          }
        }}
      >
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={userData?.nombres || ''}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={userData?.apellidos || ''}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="rutUsuario"
          placeholder="Rut"
          value={userData?.rutUsuario || ''}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData?.email || ''}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="clave"
          placeholder="Clave"
          value={userData?.clave || ''}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={userData?.telefono || ''}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={userData?.direccion || ''}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="codigoPostal"
          placeholder="Código Postal"
          value={userData?.codigoPostal || ''}
          onChange={handleChange}
          required
        />
        <button type="submit">{'Actualizar'}</button>
      </form>

      <ul>
        {currentUsers.map(user => (
          <li key={user.id}>
            <p>Nombre: {user.nombres}</p>
            <p>Apellidos: {user.apellidos}</p>
            <p>Rut: {user.rutUsuario}</p>
            <p>Email: {user.email}</p>
            <p>Clave: {user.clave}</p>
            <p>Teléfono: {user.telefono}</p>
            <p>Dirección: {user.direccion}</p>
            <p>Código Postal: {user.codigoPostal}</p>
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
            <button onClick={() => setUserData(user)}>Editar</button>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(users.length / usersPerPage)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
