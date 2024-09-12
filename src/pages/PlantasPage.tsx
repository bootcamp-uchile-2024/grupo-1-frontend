import React, {useEffect, useState} from 'react'
import { ICreateProductPlantasRequestDTO } from '../interfaces/ICreateProductPlantasRequestDTO';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function PlantasPage() {
    const navigate = useNavigate();
    const [plantas, setPlantas] = useState<ICreateProductPlantasRequestDTO[]>([]);

    useEffect( () => {
        async function getPlantas(){
            try{
                const response = await fetch('http://localhost:3000/productos/catalogo/categoria?tipo=Planta');

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

    const handleViewDetails = (plantas: any) => {
        navigate('/detalle-plantas', { state: { plantas } });
      };

    return (
        <>
            <div>Catalogo de productos</div>
            <br/>
            <div className='product-grid'>
                {plantas.map(plantas => (
                    <div key={plantas.idProducto} className='product-card'>
                        <img src={plantas.imagenProducto[0]} alt={plantas.nombreProducto} width="100"/>
                        <h3>{plantas.nombreProducto}</h3>
                        <p>Precio: ${plantas.precioNormal}</p>
                        <button onClick={() => handleViewDetails(plantas)}>Ver detalle</button>
                    </div>
                ))}
            </div>
        </>
    );
  }