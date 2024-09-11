import React, {useEffect, useState} from 'react'
import { ICreateProductPlantasRequestDTO } from '../interfaces/ICreateProductPlantasRequestDTO';

export default function PlantasPage() {
    const [plantas, setPlantas] = useState<ICreateProductPlantasRequestDTO[]>([]);

    useEffect( () => {
        async function getPlantas(){
            try{
                const response = await fetch('https://fakestoreapi.com/products');

                if(!response.ok){
                    console.log('No pudimos obtener los productos');
                }
                const plantasJson = await response.json();
                console.log(plantasJson);
                setPlantas(plantasJson);
            } catch (error){
                console.log('Error al obtener los productos');
            }
        }
        getPlantas();
    }, []);

    return (
        <>
            <div>Catalogo de productos</div>
            <br/>
            <div className='product-grid'>
                {plantas.map(planta => (
                    <div key={planta.idProducto}>
                        <img src={planta.imagenProducto[0]} alt={planta.nombreProducto} width="100"/>
                        <h3>{planta.nombreProducto}</h3>
                        <p>Price: ${planta.precioProducto}</p>
                        <button>Ver detalle</button>
                    </div>
                ))}
            </div>
        </>
    );
  }