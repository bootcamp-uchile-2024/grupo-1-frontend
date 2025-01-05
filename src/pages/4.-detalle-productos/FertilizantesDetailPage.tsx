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

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fertilizante, setFertilizante] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://3.142.12.50:4000/productos/fertilizantes/getbyid/${id}`);
        if (!response.ok) {
          throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }
        const fertilizanteData = await response.json();
        setFertilizante(fertilizanteData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido');
      } finally {
        setLoading(false);
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
      nombreProducto: fertilizante.producto.nombreProducto,
      id: fertilizante.producto.id,
      stock: fertilizante.producto.stock,
      precio: fertilizante.producto.precioNormal,
      imagenProducto: fertilizante.producto.imagenes[0]?.urlImagen || '',
      categoria: fertilizante.producto.categoria
    });
  };

  return (
    <div className="detail-container">
      <div className="detail-header">
        
      </div>

      {/* Sección del producto con imagen y detalles */}
      <div className="detail-content">
        {/* Imagen del producto */}
        <div className="detail-image">
          {fertilizante?.producto.imagenes?.length > 0 && (
            <img
              src={fertilizante?.producto.imagenes[0]?.urlImagen}
              alt={fertilizante?.producto.nombreProducto}
            />
          )}
        </div>

        {/* Información del producto */}
        <div className="detail-info">
          <h3 className="product-name">{fertilizante?.producto.nombreProducto}</h3>
          <p className="product-category">{fertilizante?.producto.categoria.nombreCategoria}</p>
          <p className="product-description">{fertilizante?.producto.descripcionProducto}</p>
          <p className="product-price">${fertilizante?.producto.precioNormal.toFixed(2)}</p>
          <p className="product-stock">Stock: {fertilizante?.producto.stock}</p>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>

      {/* Productos Relacionados */}
      <Container>
        <h2 className="my-4">Más vendidos</h2>
        <ProductCarousel
          products={featuredProducts.map((product: Product) => product.nombreProducto)}
          prices={featuredProducts.map((product: Product) => `$${product.precioNormal.toFixed(2)}`)}
          images={featuredProducts.map((product: Product) => product.imagenProducto[0])}
          id={featuredProducts.map((product: Product) => product.id)}
        />
      </Container>
    </div>
  );
};

export default ProductDetailPage;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useCart } from "../../CartContext";
  
//   interface DataFetcherProps {
//     toggleSidebar: () => void;
//   }
  
//   const DataFetcher: React.FC<DataFetcherProps> = ({}) => {
//     const {id} = useParams<{id:string}>();
//     const [fertilizante, setFertilizante] = useState<any>();
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const { addToCart } = useCart();
  
  
//     useEffect(() => {
//       const fetchProductData = async () => {
//         try{
//             if(!id) return;
//             try {
//                 const response = await fetch(`http://3.142.12.50:4000/productos/fertilizantes/getbyid/${id}`);
//                 if (!response.ok) {
//                   throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
//                 }
//                 const fertilizante = await response.json();
//                 console.log('este es el producto: ', fertilizante);
//                 console.log(typeof fertilizante);
                
//                 setFertilizante(fertilizante);
                
//               } catch (err) {
//                 if (err instanceof Error) {
//                   setError(err.message);
//                 } else {
//                   setError('Ocurrió un error desconocido');
//                 }
//               } finally {
//                 setLoading(false);
//               }
//         } catch (err) {
//             if (err instanceof Error) {
//               setError(err.message);
//             } else {
//               setError('Ocurrió un error desconocido');
//             }
//           }
        
//       };
  
//       fetchProductData();
//     }, [id]);

//     const handleAddToCart = () => {
//       addToCart({
//           nombreProducto: fertilizante.producto.nombreProducto,
//           id: fertilizante.id,
//           stock: fertilizante.producto.stock,
//           precio: fertilizante.producto.precioNormal,
//           imagenProducto: fertilizante.producto.imagenes[0].urlImagen,
//           categoria: fertilizante.producto.categoria
//       })
//     }
    
//     return (
//       <>
//         <h2>Productos</h2>
//         {loading && <p>Cargando...</p>}
//         {error && <p>Error: {error}</p>}
//         <ul>
//         <li key={fertilizante?.id}>
//                 <h3>{fertilizante?.producto.nombreProducto}</h3>
//                 {fertilizante?.producto.imagenes.length > 0 && (
//                   <img
//                     src={fertilizante?.producto.imagenes[0].urlImagen}
//                     alt={fertilizante?.nombreProducto}
//                     style={{ width: '100px', height: '100px' }}
//                   />
//                 )}
//                 <p><strong>Descripción:</strong> {fertilizante?.producto.descripcionProducto}</p>
//                 <p><strong>Precio:</strong> ${fertilizante?.producto.precioNormal.toFixed(2)}</p>
//                 <p><strong>Categoría:</strong> {fertilizante?.producto.categoria.nombreCategoria}</p>
//                 <p><strong>Stock:</strong> {fertilizante?.producto.stock}</p>
  
//                 <button onClick={handleAddToCart}>Agregar al carrito</button>
//               </li>
//         </ul>
//       </>
//     );
//   };
  
//   export default DataFetcher;