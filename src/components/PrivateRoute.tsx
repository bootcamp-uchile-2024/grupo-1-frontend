import { ReactNode } from "react";
import { isAuth } from "../services/login/loginServices";

interface PrivateRouteProps{
    children:ReactNode
}

export const PrivateRoute = (props: PrivateRouteProps) => {
    const auth = isAuth();
    return(
        <>
            {auth ? props.children: <div>Acceso Denegado</div>}
        </>
    );
}

