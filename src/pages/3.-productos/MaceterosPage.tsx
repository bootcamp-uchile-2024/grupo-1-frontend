import {useEffect, useState} from 'react'
import { ICreateProductMaceterosRequestDTO } from '../../interfaces/ICreateProductMaceterosRequestDTO';
import { useNavigate } from 'react-router-dom';

export default function MaceterosPage() {
    const navigate = useNavigate();
    const [maceteros, setMaceteros] = useState<ICreateProductMaceterosRequestDTO[]>([]);

    useEffect( () => {
        async function getMaceteros(){
            try{
                const response = await fetch('https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Macetero');

                if(!response.ok){
                    console.log('No pudimos obtener los productos');
                }
                const maceterosJson = await response.json();
                console.log(maceterosJson);
                setMaceteros(maceterosJson);
            } catch (error){
                console.log('Error al obtener los productos');
                return error;
            }
        }
        getMaceteros();
    }, []);

    const handleViewDetails = (maceteros: any) => {
        navigate('/detalle-maceteros', { state: { maceteros } });
      };

    return (
        <>
            <div>Catalogo de productos</div>
            <br/>
            <div className='product-grid'>
                {maceteros.map(macetero => (
                    <div key={macetero.idProducto} className='product-card'>
                        <img src={macetero.imagenProducto[0]} alt={macetero.nombreProducto} width="100"/>
                        <h3>{macetero.nombreProducto}</h3>
                        <p>Price: ${macetero.precioNormal}</p>
                        <button onClick={() => handleViewDetails(macetero)}>Ver detalle</button>
                    </div>
                ))}
            </div>
        </>
    );
  }