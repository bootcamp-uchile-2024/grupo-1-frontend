import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage: React.FC = () => {
  return (
    <div className="admin-container">
      <h2 className="admin-title">Administración</h2>
      <ul className="admin-list">
        <li className="admin-list-item">
          <Link className="admin-button" to="/gestion-usuarios">Gestionar Usuarios</Link>
        </li>
        <li className="admin-list-item">
          <Link className="admin-button" to="/gestion-productos">Gestionar Productos</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminPage;