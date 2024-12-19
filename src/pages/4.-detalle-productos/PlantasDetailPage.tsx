
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../CartContext";
import { Container } from "react-bootstrap";
import ProductCarousel from "../../components/ProductCarousel";
import './ProductDetailPage.css';

interface Product {
  id: string;
  nombreProducto: string;
  precioNormal: number;
  imagenProducto: string[];
  categoria: string;
}

interface DataFetcherProps {
  toggleSidebar?: () => void; 
}
  
  const DataFetcher: React.FC<DataFetcherProps> = ({}) => {
    const {id} = useParams<{id:string}>();
    const [planta, setPlanta] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  
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

    useEffect(() => {
        const fetchCatalog = async () => {
          try {
            const response = await fetch('http://3.142.12.50:4000/productos/catalogo?page=1&size=200');
            if (!response.ok) {
              throw new Error(`Error al obtener el catálogo: ${response.statusText}`);
            }
    
            const result = await response.json();
            const products: Product[] = result.data.map((item: any) => ({
              id: item.id,
              nombreProducto: item.nombreProducto,
              precioNormal: item.precioNormal,
              imagenProducto: item.imagenes?.map((img: { urlImagen: string }) => img.urlImagen) || [],
              categoria: item.categoria?.nombreCategoria || 'Sin categoría',
            }));
    
            setFeaturedProducts(products.slice(0, 8));
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
          } finally {
            setLoading(false);
          }
        };
    
        fetchCatalog();
      }, []);
    
      if (loading) {
        return <p>Cargando...</p>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }

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
        <div>
          <ul>
            <li key={planta?.id}>
              <h3>{planta?.nombrePlanta}</h3>
              <h4>{planta?.nombreCientifico}</h4>
              <div>
                {planta?.producto.imagenes.length > 0 && (
                  <img
                    src={planta?.producto.imagenes[0].urlImagen}
                    alt={planta?.nombrePlanta}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
              </div>
              <div>
                <p><strong>Descripción:</strong> {planta?.producto.descripcionProducto}</p>
                <p><strong>Precio:</strong> ${planta?.producto.precioNormal.toFixed(2)}</p>
                <p><strong>Categoría:</strong> {planta?.producto.categoria.nombreCategoria}</p>
                <p><strong>Stock:</strong> {planta?.producto.stock}</p>
              </div>
              <button onClick={handleAddToCart}>Agregar al carrito</button>
              </li>
          </ul>
        </div>
        <div>
          {/* Productos Destacados */}
          <Container>
            <h2 className="my-4">Más Vendidos</h2>
            <ProductCarousel
              products={featuredProducts.map((product: Product) => product.nombreProducto)}
              prices={featuredProducts.map((product: Product) => `$${product.precioNormal.toFixed(2)}`)}
              images={featuredProducts.map((product: Product) => product.imagenProducto[0])}
              id={featuredProducts.map((product: Product) => product.id)}
            />
          </Container>
        </div>
      </>
    );
  };
  
  export default DataFetcher;
  