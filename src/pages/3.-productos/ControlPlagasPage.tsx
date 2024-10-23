import {useEffect, useState} from 'react'
import { ICreateProductControlDePlagasRequestDTO } from '../../interfaces/ICreateProductControlDePlagasRequestDTO';
import { useNavigate } from 'react-router-dom';


export default function ControlDePlagasPage() {
    const navigate = useNavigate();
    const [controlDePlagas, setControlDePlagas] = useState<ICreateProductControlDePlagasRequestDTO[]>([]);

    useEffect( () => {
        async function getControlDePlagas(){
            try{
                const response = await fetch('https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Control%20Plagas');

                if(!response.ok){
                    console.log('No pudimos obtener los productos');
                }
                const controlDePlagasJson = await response.json();
                console.log(controlDePlagasJson);
                setControlDePlagas(controlDePlagasJson);
            } catch (error){
                console.log('Error al obtener los productos');
                return error;
            }
        }
        getControlDePlagas();
    }, []);

    const handleViewDetails = (controlDePlagas: any) => {
        navigate('/detalle-plagas', { state: { controlDePlagas } });
      };

    return (
        <>
            <div>Catalogo de productos</div>
            <br/>
            <div className='product-grid'>
                {controlDePlagas.map(controlDePlaga => (
                    <div key={controlDePlaga.idProducto} className='product-card'>
                        <img src={controlDePlaga.imagenProducto[0]} alt={controlDePlaga.nombreProducto} width="100"/>
                        <h3>{controlDePlaga.nombreProducto}</h3>
                        <p>Price: ${controlDePlaga.precioNormal}</p>
                        <button onClick={() => handleViewDetails(controlDePlaga)}>Ver detalle</button>
                    </div>
                ))}
            </div>
        </>
    );
  }