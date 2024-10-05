import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css'
import { isAuth, logout } from "../services/login/loginServices";

export function UserInfo() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
    location.reload();
  }

  useEffect(() => {
    setIsLoggedIn(isAuth());
  },[]);

    return (
        <div>
            {   
                isLoggedIn ?
                    <button type="button" onClick={handleLogout}>Logout</button>
                    :
                    <button type="button" onClick={() => navigate("/login")}>Login</button>
            }
        </div>
    );
}