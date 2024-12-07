
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../CartContext";
  
  interface DataFetcherProps {
    toggleSidebar: () => void;
  }
  
  const DataFetcher: React.FC<DataFetcherProps> = ({}) => {
    const {id} = useParams<{id:string}>();
    const [sustrato, setSustrato] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
  
  
    useEffect(() => {
      const fetchProductData = async () => {
        try{
            if(!id) return;
            try {
                const response = await fetch(`http://13.53.40.69:4000/productos/sustratos/getbyid/${id}`);
                if (!response.ok) {
                  throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
                }
                const sustrato = await response.json();
                console.log('este es el producto: ', sustrato);
                console.log(typeof sustrato);
                
                setSustrato(sustrato);
                
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
          nombreProducto: sustrato.producto.nombreProducto,
          id: sustrato.id,
          stock: sustrato.producto.stock,
          precio: sustrato.producto.precioNormal,
          imagenProducto: sustrato.producto.imagenes[0].urlImagen,
          categoria: sustrato.producto.categoria
      })
    }
    
    return (
      <>
        <h2>Productos</h2>
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
        <li key={sustrato?.id}>
                <h3>{sustrato?.producto.nombreProducto}</h3>
                {sustrato?.producto.imagenes.length > 0 && (
                  <img
                    src={sustrato?.producto.imagenes[0].urlImagen}
                    alt={sustrato?.nombreProducto}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
                <p><strong>Descripción:</strong> {sustrato?.producto.descripcionProducto}</p>
                <p><strong>Precio:</strong> ${sustrato?.producto.precioNormal.toFixed(2)}</p>
                <p><strong>Categoría:</strong> {sustrato?.producto.categoria.nombreCategoria}</p>
                <p><strong>Stock:</strong> {sustrato?.producto.stock}</p>
  
                <button onClick={handleAddToCart}>Agregar al carrito</button>
              </li>
        </ul>
      </>
    );
  };
  
  export default DataFetcher;
