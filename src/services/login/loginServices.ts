interface ILogin {
    user: string;
    password:string;
    region: string;
    roles: string[];
}

export function Login(user: ILogin):boolean {

    if(user.user === 'admin' && user.password === 'admin'){
        const userResponse: ILogin = {
            ...user,
            roles: ['admin']
        }
        const datosUsuario = JSON.stringify(userResponse);
        localStorage.setItem('user', datosUsuario);
        return true;
    } 
    if(user.user === 'user' && user.password === 'user'){
        const userResponse: ILogin = {
            ...user,
            roles: ['user']
        }
        const datosUsuario = JSON.stringify(userResponse);
        localStorage.setItem('user', datosUsuario);
        return true;
    } 
    else {
        return false;
    }
}

export function logout() {
    localStorage.removeItem('user');
    location.reload();
}

//forma mas corta
export const isAuth = () => localStorage.getItem('user') ? true : false;

export const userHasRole = (roles: string[]) => {
    const user = localStorage.getItem('user');
    if (user){
        const userResponse: ILogin =JSON.parse(user);
        return roles.some(role => userResponse.roles.includes(role));
    }
    return false;
}


// export const isAuth = () => {
//     //forma corta
//     return localStorage.getItem('user') ? true : false;
    
//     //forma larga
//     // if(localStorage.getItem('user')){
//     //     return true;
//     // } else {
//     //     return false;
//     // }
// }