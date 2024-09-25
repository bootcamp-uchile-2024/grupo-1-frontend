import React from 'react'
import { Link } from 'react-router-dom'
import { UserInfo } from './UserInfo'

export default function Nav() {
  return (
    <nav>
        <ul>
            <li><Link to="/">Inicio</Link></li>
            {/* <li><Link to="/catalogo">Catalogo</Link></li> */}
            <li><Link to="/admin">Admin</Link></li>
            {/* <li><Link to="/login">Login</Link></li> */}
            <li><Link to="/plantas">Plantas</Link></li>
            {/* <li><Link to="/maceteros">Maceteros</Link></li>
            <li><Link to="/fertilizantes">Fertilizantes</Link></li>
            <li><Link to="/sustratos">Sustratos</Link></li>
            <li><Link to="/control-de-plagas">Control de Plagas</Link></li> */}
            <li><Link to="/quienes-somos">Quienes somos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/formulario-productos">Formulario de productos</Link></li>
            <li><Link to="/formulario-usuario">Crear usuarios</Link></li>
        </ul>
    </nav>
  )
}
