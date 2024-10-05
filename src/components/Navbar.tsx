import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import Dropdown from './Dropdown'
import { UserInfo } from './UserInfo'

export default function Navbar() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const onMouseEnter = () => {
        if(window.innerWidth < 960){
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };
    const onMouseLeave = () => {
        if(window.innerWidth < 960){
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };
  
    return (
    <>
        <nav className='navbar'>
            <Link to = '/' className='navbar-logo'>
                PLANTOPIA
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className= {click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
                </li>
                <li className='nav-item' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    <Link to='/services' className='nav-links' onClick={closeMobileMenu}>Productos <i className='fas fa-caret-down'/></Link>
                    {dropdown && <Dropdown />}
                </li>
                <li className='nav-item'>
                    <Link to='/contacto' className='nav-links' onClick={closeMobileMenu}>Contáctanos</Link>
                </li>
                <li className='nav-item'>
                    <Link to='quienes-somos' className='nav-links' onClick={closeMobileMenu}>Quienes Somos</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/admin' className='nav-links' onClick={closeMobileMenu}>Administrador</Link>
                </li>
                <li className='nav-item'>
                    <div className='nav-links' onClick={closeMobileMenu}><UserInfo /></div>
                </li>
            </ul>
            
        </nav>
    </>
  );
}