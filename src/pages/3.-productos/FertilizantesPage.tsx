import {useEffect, useState} from 'react'
import { ICreateProductFertilizantesRequestDTO } from '../../interfaces/ICreateProductFertilizantesRequestDTO';
import { useNavigate } from 'react-router-dom';


export default function FertilizantesPage() {
    const navigate = useNavigate();
    const [fertilizantes, setFertilizantes] = useState<ICreateProductFertilizantesRequestDTO[]>([]);

    useEffect( () => {
        async function getFertilizantes(){
            try{
                const response = await fetch('https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Fertilizantes');

                if(!response.ok){
                    console.log('No pudimos obtener los productos');
                }
                const fertilizantesJson = await response.json();
                console.log(fertilizantesJson);
                setFertilizantes(fertilizantesJson);
            } catch (error){
                console.log('Error al obtener los productos');
                return error;
            }
        }
        getFertilizantes();
    }, []);

    const handleViewDetails = (fertilizantes: any) => {
        navigate('/detalle-fertilizantes', { state: { fertilizantes } });
      };

    return (
        <>
            <div>Catalogo de productos</div>
            <br/>
            <div className='product-grid'>
                {fertilizantes.map(fertilizante => (
                    <div key={fertilizante.idProducto} className='product-card'>
                        <img src={fertilizante.imagenProducto[0]} alt={fertilizante.nombreProducto} width="100"/>
                        <h3>{fertilizante.nombreProducto}</h3>
                        <p>Price: ${fertilizante.precioProducto}</p>
                        <button onClick={() => handleViewDetails(fertilizante)}>Ver detalle</button>
                    </div>
                ))}
            </div>
        </>
    );
  }