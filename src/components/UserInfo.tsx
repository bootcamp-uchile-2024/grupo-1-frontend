import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css'
import { isAuth, logout } from "../services/login/loginServices";

export function UserInfo() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  // Función para hacer logout
  const handleLogout = () => {
    logout();  // Asume que logout limpia la sesión de usuario
    // location.reload();
    navigate("/");  // Redirige al inicio
  };

  // useEffect para comprobar si el usuario está autenticado
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isAuth();  // Llama a la función isAuth para saber si está logueado
      setIsLoggedIn(loggedIn);
    };

    checkAuth();
  }, []);  // Solo se ejecuta una vez al montar el componente

  return (
    <div>
      {isLoggedIn ? (
        // Si está logueado, muestra el botón de logout
        <button type="button" onClick={handleLogout}>Logout</button>
      ) : (
        // Si no está logueado, muestra el botón de login
        <button type="button" onClick={() => navigate("/login")}>Login</button>
      )}
    </div>
  );
}
