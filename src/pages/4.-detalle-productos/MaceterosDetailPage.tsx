
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../CartContext";
  
  interface DataFetcherProps {
    toggleSidebar: () => void;
  }
  
  const DataFetcher: React.FC<DataFetcherProps> = ({ }) => {
    const {id} = useParams<{id:string}>();
    const [macetero, setMacetero] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
  
  
    useEffect(() => {
      const fetchProductData = async () => {
        try{
            if(!id) return;
            try {
                const response = await fetch(`http://3.142.12.50:4000/productos/maceteros/getbyid/${id}`);
                if (!response.ok) {
                  throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
                }
                const macetero = await response.json();
                console.log('este es el producto: ', macetero);
                console.log(typeof macetero);
                
                setMacetero(macetero);
                
              } catch (err) {
                if (err instanceof Error) {
                  setError(err.message);
                } else {
                  setError('Ocurrió un error desconocido');
                }
              } finally {
                setLoading(false);
              }
        } catch (err) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError('Ocurrió un error desconocido');
            }
          }
        
      };
  
      fetchProductData();
    }, [id]);

    const handleAddToCart = () => {
      addToCart({
          nombreProducto: macetero.producto.nombreProducto,
          id: macetero.id,
          stock: macetero.producto.stock,
          precio: macetero.producto.precioNormal,
          imagenProducto: macetero.producto.imagenes[0].urlImagen,
          categoria: macetero.producto.categoria
      })
    }
    
    return (
      <>
        <h2>Productos</h2>
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
        <li key={macetero?.id}>
                <h3>{macetero?.producto.nombreProducto}</h3>
                {macetero?.producto.imagenes.length > 0 && (
                  <img
                    src={macetero?.producto.imagenes[0].urlImagen}
                    alt={macetero?.nombreProducto}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
                <p><strong>Descripción:</strong> {macetero?.producto.descripcionProducto}</p>
                <p><strong>Precio:</strong> ${macetero?.producto.precioNormal.toFixed(2)}</p>
                <p><strong>Categoría:</strong> {macetero?.producto.categoria.nombreCategoria}</p>
                <p><strong>Stock:</strong> {macetero?.producto.stock}</p>
  
                <button onClick={handleAddToCart}>Agregar al carrito</button>
              </li>
        </ul>
      </>
    );
  };
  
  export default DataFetcher;
  







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