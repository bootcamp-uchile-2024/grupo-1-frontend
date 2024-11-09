import React, { useState, useEffect } from 'react';

interface User {
  id: string; // O el tipo correspondiente que uses para el ID
  name: string;
  email: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://yourapi.com/api/usuarios');
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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://yourapi.com/api/usuarios/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id)); // Filtrar el usuario eliminado
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
            {/* Aquí podrías agregar un enlace para editar el usuario */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
