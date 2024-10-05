import {useEffect, useState} from 'react'
import { ICreateProductSustratosRequestDTO } from '../interfaces/ICreateProductSustratosRequestDTO';

export default function SustratosPage() {
    const [sustratos, setSustratos] = useState<ICreateProductSustratosRequestDTO[]>([]);

    useEffect( () => {
        async function getSustratos(){
            try{
                const response = await fetch('https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Sustrato');

                if(!response.ok){
                    console.log('No pudimos obtener los productos');
                }
                const sustratosJson = await response.json();
                console.log(sustratosJson);
                setSustratos(sustratosJson);
            } catch (error){
                console.log('Error al obtener los productos');
                return error;
            }
        }
        getSustratos();
    }, []);

    return (
        <>
            <div>Catalogo de productos</div>
            <br/>
            <div className='product-grid'>
                {sustratos.map(sustrato => (
                    <div key={sustrato.idProducto} className='product-card'>
                        <img src={sustrato.imagenProducto[0]} alt={sustrato.nombreProducto} width="100"/>
                        <h3>{sustrato.nombreProducto}</h3>
                        <p>Price: ${sustrato.precioNormal}</p>
                        <button>Ver detalle</button>
                    </div>
                ))}
            </div>
        </>
    );
  }