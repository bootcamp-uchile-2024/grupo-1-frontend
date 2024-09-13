import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'

export default function PlantasDatailPage() {
    const location = useLocation();
    const { plantas } = location.state || {};  
    

    if (!plantas) {
        return <div>No se encontró el producto.</div>;
    }

    

    return(
        <>
        <div>Detalle de Planta</div>
        <div className='product-card-det'>
            <div>
                <h3>{plantas.nombreProducto}</h3>
                <img src={plantas.imagenProducto[0]} alt=""/>
            </div>
            <div>
            </div>
            <div>
                <p>precio: ${plantas.precioNormal}</p>
                <p>{plantas.descripcionProducto}</p>
            </div>
        </div>
        </>
    );
}









// import { ICreateProductPlantasRequestDTO } from '../interfaces/ICreateProductPlantasRequestDTO';

// const {idProducto} = useParams<{idProducto:string}>();
    // const [planta, setPlanta] = useState<ICreateProductPlantasRequestDTO>();

    // useEffect(() => {
    //     async function getPlanta(){
    //     try{
    //         if(!idProducto) return;

    //         try{
    //         const response = await fetch(`http://localhost:3000/productos/catalogo/categoria?tipo=Planta/${idProducto}`);
    //         if(!response.ok){
    //             console.log('No pudimos obtener el producto');
    //         }

    //         const plantasJson = await response.json();
    //         console.log('este es el producto: ', plantasJson);
    //         setPlanta(plantasJson);
    //         } catch (error){
    //         console.log('Error al obtener el producto');
    //         }
    //     } catch (error){
    //         console.log('Error al obtener el producto');
    //     }
    //     }
    //     getPlanta();
    // }, []);