import { ReactNode } from "react";

interface PrivateRouteProps{
    children:ReactNode
}

export const PrivateRoute = (props: PrivateRouteProps) => {
    const auth = isValidate();
    return(
        <>
            {auth ? props.children: <div>Acceso Denegado</div>}
        </>
    );
}

const isValidate = () => {
    return true;
}