import {useEffect, useState} from 'react'
import { ICreateProductControlDePlagasRequestDTO } from '../interfaces/ICreateProductControlDePlagasRequestDTO';

export default function ControlDePlagasPage() {
    const [controlDePlagas, setControlDePlagas] = useState<ICreateProductControlDePlagasRequestDTO[]>([]);

    useEffect( () => {
        async function getControlDePlagas(){
            try{
                const response = await fetch('https://fakestoreapi.com/products');

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

    return (
        <>
            <div>Catalogo de productos</div>
            <br/>
            <div className='product-grid'>
                {controlDePlagas.map(controlDePlaga => (
                    <div key={controlDePlaga.idProducto}>
                        <img src={controlDePlaga.imagenProducto[0]} alt={controlDePlaga.nombreProducto} width="100"/>
                        <h3>{controlDePlaga.nombreProducto}</h3>
                        <p>Price: ${controlDePlaga.precioProducto}</p>
                        <button>Ver detalle</button>
                    </div>
                ))}
            </div>
        </>
    );
  }