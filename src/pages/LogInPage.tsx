import { useState } from "react";

interface IForm {
    user: string;
    password:string;
}

export function LogInPage() {
    const [form, setForm] = useState<IForm>({
        user: '',
        password: ''
    });

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("el valor del elemento en form es ",form);
    }
    
    const handleChange  = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm({
            user: event.target.value,
            password: 'icivil.30'
        });
        console.log(event.target.value);
    }

    return (
    <div>
        <h1>Login Page</h1>
        <p>Esta es la página de login</p>
        <form>
            <input type="text" placeholder="Usuario" name="user" onChange={handleChange} value={form.user}/>
            <input type="password" placeholder="Contraseña" name="password" onChange={handleChange} value={form.password}/>
            <button type="submit" onClick={handleSubmit}>Iniciar Sesión</button>
        </form>
    </div>
  );
}