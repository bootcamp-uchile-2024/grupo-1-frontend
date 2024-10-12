import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { ICreateProductPlantasRequestDTO } from '../../interfaces/ICreateProductPlantasRequestDTO';

export default function PlantasPage() {
    const navigate = useNavigate();
    const [plantas, setPlantas] = useState<ICreateProductPlantasRequestDTO[]>([]);

    useEffect( () => {
        async function getPlantas(){
            try{
                const response = await fetch('https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Planta');

                if(!response.ok){
                    console.log('No pudimos obtener los productos');
                }
                const plantasJson = await response.json();
                console.log(plantasJson);
                setPlantas(plantasJson);
            } 
            catch (error){
                console.log('Error al obtener los productos');
                return error;
            }
        }
        getPlantas();
    }, []);

    const handleViewDetails = (plantas: any) => {
        navigate('/detalle-plantas', { state: { plantas } });
      };

    return (
        <>
            <h2>Catalogo de productos</h2>
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