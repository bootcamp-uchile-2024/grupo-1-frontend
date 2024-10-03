import {useEffect, useState} from 'react'
import { ICreateProductMaceterosRequestDTO } from '../interfaces/ICreateProductMaceterosRequestDTO';

export default function MaceterosPage() {
    const [maceteros, setMaceteros] = useState<ICreateProductMaceterosRequestDTO[]>([]);

    useEffect( () => {
        async function getMaceteros(){
            try{
                const response = await fetch('https://fakestoreapi.com/products');

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

    return (
        <>
            <div>Catalogo de productos</div>
            <br/>
            <div className='product-grid'>
                {maceteros.map(macetero => (
                    <div key={macetero.idProducto}>
                        <img src={macetero.imagenProducto[0]} alt={macetero.nombreProducto} width="100"/>
                        <h3>{macetero.nombreProducto}</h3>
                        <p>Price: ${macetero.precioProducto}</p>
                        <button>Ver detalle</button>
                    </div>
                ))}
            </div>
        </>
    );
  }