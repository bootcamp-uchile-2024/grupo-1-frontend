import { useState } from "react";
import { Login } from "../services/login/loginServices";
import { useNavigate } from "react-router-dom";

interface IForm {
    user: string;
    roles: [];
    password:string;
    region: string;
    acepto: boolean;
}

export function LogInPage() {
    
    const navigate = useNavigate();
    const [form, setForm] = useState<IForm>({
        user: '',
        roles: [],
        password: '',
        region: '',
        acepto: false
    });

    const [error, setError] = useState<boolean>(false);
    const [validCredential, setValidCredential] = useState<boolean>(true);

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // console.log("el valor del elemento en form es ",form);

        //validación de formulario
        if(form.user === '' || form.password === '' || form.region === ''){
            setError(true);
            return;
        }

        //validación de credenciales
        if(Login(form)){
            navigate("/");
        } else {
            setValidCredential(false);
        }
        console.log("Formulario enviado");
    }
    
    const handleChange  = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type, checked} = event.target as HTMLInputElement;
        console.log(`el tipo de input es ${type} y el value es ${value} y el checked status es ${checked}`);
        
        setError(false);
        setValidCredential(true);
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    }

    return (
    <div>
        <h1>Login Page</h1>
        <p>Esta es la página de login</p>
        <form>
            <input type="text" placeholder="Usuario" name="user" onChange={handleChange} value={form.user}/>
            <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} value={form.password}/>
            <input type="checkbox" name="acepto" onChange={handleChange} checked={form.acepto}/>
            <select name="region" id="region" onChange={handleChange} value={form.region}>
                <option value="">Seleccione...</option>
                <option value="stgo">Santiago</option>
                <option value="ptovr">Puerto Varas</option>
                <option value="ptoay">Puerto Aysen</option>
            </select>
            <button type="submit" onClick={handleSubmit}>Iniciar Sesión</button>
        </form>
        {error && <div>Falta llenar algunos campos</div>}
        {!validCredential && <div>Nombre de usuario o contraseña incorrecta</div>}
    </div>
  );
}
