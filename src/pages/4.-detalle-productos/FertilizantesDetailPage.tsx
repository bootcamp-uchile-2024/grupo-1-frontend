
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../CartContext";
  
  interface DataFetcherProps {
    toggleSidebar: () => void;
  }
  
  const DataFetcher: React.FC<DataFetcherProps> = ({}) => {
    const {id} = useParams<{id:string}>();
    const [fertilizante, setFertilizante] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
  
  
    useEffect(() => {
      const fetchProductData = async () => {
        try{
            if(!id) return;
            try {
                const response = await fetch(`http://13.53.40.69:4000/productos/fertilizantes/getbyid/${id}`);
                if (!response.ok) {
                  throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
                }
                const fertilizante = await response.json();
                console.log('este es el producto: ', fertilizante);
                console.log(typeof fertilizante);
                
                setFertilizante(fertilizante);
                
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
          nombreProducto: fertilizante.producto.nombreProducto,
          id: fertilizante.id,
          stock: fertilizante.producto.stock,
          precio: fertilizante.producto.precioNormal,
          imagenProducto: fertilizante.producto.imagenes[0].urlImagen,
          categoria: fertilizante.producto.categoria
      })
    }
    
    return (
      <>
        <h2>Productos</h2>
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
        <li key={fertilizante?.id}>
                <h3>{fertilizante?.producto.nombreProducto}</h3>
                {fertilizante?.producto.imagenes.length > 0 && (
                  <img
                    src={fertilizante?.producto.imagenes[0].urlImagen}
                    alt={fertilizante?.nombreProducto}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
                <p><strong>Descripción:</strong> {fertilizante?.producto.descripcionProducto}</p>
                <p><strong>Precio:</strong> ${fertilizante?.producto.precioNormal.toFixed(2)}</p>
                <p><strong>Categoría:</strong> {fertilizante?.producto.categoria.nombreCategoria}</p>
                <p><strong>Stock:</strong> {fertilizante?.producto.stock}</p>
  
                <button onClick={handleAddToCart}>Agregar al carrito</button>
              </li>
        </ul>
      </>
    );
  };
  
  export default DataFetcher;
