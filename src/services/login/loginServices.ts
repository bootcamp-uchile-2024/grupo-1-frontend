interface ILogin {
    user: string;
    password:string;
    region: string;
}

export function Login(user: ILogin):boolean {
    if(user.user === 'admin' && user.password === 'admin'){
        const datosUsuario = JSON.stringify(user);
        localStorage.setItem('user', datosUsuario);
        return true;
    } else {
        return false;
    }
}

export function logout() {
    localStorage.removeItem('user');
}

//forma mas corta
export const isAuth = () => localStorage.getItem('user') ? true : false;


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