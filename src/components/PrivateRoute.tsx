import { ReactNode } from "react";
import { isAuth, userHasRole } from "../services/login/loginServices";

interface PrivateRouteProps{
    children:ReactNode;
    roles: string[];
}

export const PrivateRoute = (props: PrivateRouteProps) => {
    const auth = isAuth();
    const hasRole = userHasRole(props.roles);
    return(
        <>
            {auth && hasRole ? props.children: <div>Acceso Denegado</div>}
        </>
    );
}

