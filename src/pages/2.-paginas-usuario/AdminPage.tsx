import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage: React.FC = () => {
  return (
    <div>
      <h2>Administración</h2>
      <ul>
        <li>
          <Link to="/gestion-usuarios">Gestionar Usuarios</Link>
        </li>
        <li>
          <Link to="/gestion-productos">Gestionar Productos</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminPage; 
