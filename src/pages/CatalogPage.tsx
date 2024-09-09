import React, {useEffect, useState} from 'react'
import { IProducts } from '../interfaces/IProduct';

export default function CatalogPage() {
    const [products, setProducts] = useState<IProducts[]>([]);

    useEffect( () => {
        async function getProducts(){
            try{
                const response = await fetch('mi_url_servicio');

                if(!response.ok){
                    console.log('No pudimos obtener los productos');
                }
                const productsJson = await response.json();
                console.log(productsJson);
                setProducts(productsJson);
            } catch (error){
                console.log('Error al obtener los productos');
            }
        }
        getProducts();
    }, []);

    return (
        <>
            <div>Catalogo de productos</div>
            <br/>
            <div className='product-grid'>
                {products.map(product => (
                    <div key={product.id}>
                        <img src={product.image} alt={product.title} width="100"/>
                        <h3>{product.title}</h3>
                        <p>Price: ${product.price}</p>
                        <button>Ver detalle</button>
                    </div>
                ))}
            </div>
        </>
    );
  }