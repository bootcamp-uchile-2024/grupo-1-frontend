import React, {useEffect, useState} from 'react'
import { ICreateProductFertilizantesRequestDTO } from '../interfaces/ICreateProductFertilizantesRequestDTO';

export default function FertilizantesPage() {
    const [fertilizantes, setFertilizantes] = useState<ICreateProductFertilizantesRequestDTO[]>([]);

    useEffect( () => {
        async function getFertilizantes(){
            try{
                const response = await fetch('https://fakestoreapi.com/products');

                if(!response.ok){
                    console.log('No pudimos obtener los productos');
                }
                const fertilizantesJson = await response.json();
                console.log(fertilizantesJson);
                setFertilizantes(fertilizantesJson);
            } catch (error){
                console.log('Error al obtener los productos');
            }
        }
        getFertilizantes();
    }, []);

    return (
        <>
            <div>Catalogo de productos</div>
            <br/>
            <div className='product-grid'>
                {fertilizantes.map(fertilizante => (
                    <div key={fertilizante.idProducto}>
                        <img src={fertilizante.imagenProducto[0]} alt={fertilizante.nombreProducto} width="100"/>
                        <h3>{fertilizante.nombreProducto}</h3>
                        <p>Price: ${fertilizante.precioProducto}</p>
                        <button>Ver detalle</button>
                    </div>
                ))}
            </div>
        </>
    );
  }