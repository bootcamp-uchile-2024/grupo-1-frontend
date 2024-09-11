import React, { useEffect, useState } from 'react'
import {IProducts} from '../interfaces/IProducts'
import {useParams} from 'react-router-dom'

export default function ProductDatailPage() {

  const {id} = useParams<{id:string}>();
  const [product, setProduct] = useState<IProducts | null>(null);

  useEffect(() => {
    async function getProduct(){
      try{
        if(!id) return;

        try{
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          if(!response.ok){
            console.log('No pudimos obtener el producto');
          }

          const productsJson = await response.json();
          console.log('este es el producto: ', productsJson);
          setProduct(productsJson);
        } catch (error){
          console.log('Error al obtener el producto');
        }
      } catch (error){
        console.log('Error al obtener el producto');
      }
    }

    getProduct();
  }, []);

  return(
    <>
      <div>ProductDetailPage</div>
      <div className='product-card-det'>
        <div>
          <h3>{product?.title}</h3>
          <img src={product?.image} alt=""/>
        </div>
        <div>
          <p>price: ${product?.price}</p>
          <p>{product?.description}</p>
        </div>
      </div>
    </>
  )
}