
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../CartContext";

  
interface DataFetcherProps {
  toggleSidebar?: () => void; 
}
  
  const DataFetcher: React.FC<DataFetcherProps> = ({}) => {
    const {id} = useParams<{id:string}>();
    const [planta, setPlanta] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
  
  
    useEffect(() => {
      const fetchProductData = async () => {
        try{
            if(!id) return;
            try {
                const response = await fetch(`http://3.142.12.50:4000/productos/plantas/getbyid/${id}`);
                if (!response.ok) {
                  throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
                }
                const planta = await response.json();
                console.log('este es el producto: ', planta);
                console.log(typeof planta);
                
                setPlanta(planta);
                
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
        nombreProducto: planta.nombrePlanta,
        id: planta.id,
        stock: planta.producto.stock,
        precio: planta.producto.precioNormal,
        imagenProducto: planta.producto.imagenes[0].urlImagen,
        categoria: planta.producto.categoria
      })
    }
    

  
    return (
      <>
        <h2>Productos</h2>
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
        <div className="product-card">
          <ul>
            <li key={planta?.id}>
              <h3>{planta?.nombrePlanta}</h3>
              <h4>{planta?.nombreCientifico}</h4>
              <div className="product-image">
                {planta?.producto.imagenes.length > 0 && (
                  <img
                    src={planta?.producto.imagenes[0].urlImagen}
                    alt={planta?.nombrePlanta}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
              </div>
              <div className="product-info">
                <p><strong>Descripción:</strong> {planta?.producto.descripcionProducto}</p>
                <p><strong>Precio:</strong> ${planta?.producto.precioNormal.toFixed(2)}</p>
                <p><strong>Categoría:</strong> {planta?.producto.categoria.nombreCategoria}</p>
                <p><strong>Stock:</strong> {planta?.producto.stock}</p>
              </div>
              <button className="view-product-button" onClick={handleAddToCart}>Agregar al carrito</button>
              </li>
          </ul>
        </div>
      </>
    );
  };
  
  export default DataFetcher;
  