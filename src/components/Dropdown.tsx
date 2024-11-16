import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from './MenuItems';
import './Dropdown.css';

export default function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <ul className={`dropdown-menu ${click ? 'show' : ''}`} onClick={handleClick}>
      {MenuItems.map((item, index) => (
        <li key={index}>
          <Link 
            className={item.cName} 
            to={item.path} 
            onClick={() => setClick(false)} 
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
