
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../CartContext";
interface Product {
    id: number; // Agregamos la variable id
    nombreProducto: string;
    nombreCientifico?: string;
    imagenProducto: string;
    descuento?: number;
    precio: number;
    coberturaDeDespacho?: string;
    stock: number;
    descripcionProducto: string;
    categoria: string;
    habitat?: string;
    luz?: string;
    frecuenciaDeRiego?: string;
    fertilizanteSugerido?: string;
    humedadIdeal?: string;
    temperaturaIdeal?: number;
    toxicidadParaMascotas?: boolean;
    tipoDeSuelo?: string;
    dificultadDeCuidado?: string;
  }
  
  interface DataFetcherProps {
    toggleSidebar: () => void;
  }
  
  const DataFetcher: React.FC<DataFetcherProps> = ({ toggleSidebar }) => {
    const {id} = useParams<{id:string}>();
    const [product, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart, cartItems, removeFromCart } = useCart();
  
    // const API_URLS: Record<DataFetcherProps['tipo'], string> = {
    //   plantas: `http://16.171.43.137:4000/productos/plantas/getbyid/${id}`,
    // };
  
    useEffect(() => {
      const fetchProductData = async () => {
        try{
            if(!id) return;
            try {
                const response = await fetch(`http://16.171.43.137:4000/productos/plantas/getbyid/${id}`);
                if (!response.ok) {
                  throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
                }
                const planta = await response.json();
                console.log('este es el producto: ', planta);
                console.log(typeof planta);
                
                console.log(Object.values(planta));

                const mappedProduct = planta.data.map((item: any) => ({
                  id: item.producto.id, // Extraemos el id del producto
                  nombreProducto: item.producto.nombreProducto,
                  nombreCientifico: item.nombreCientifico,
                  imagenProducto: item.producto.imagenes.map((img: any) => img.urlImagen),
                  descuento: item.producto.descuento,
                  precio: item.producto.precioNormal,
                  stock: item.producto.stock,
                  descripcionProducto: item.producto.descripcionProducto,
                  categoria: item.producto.categoria.nombreCategoria,
                  temperaturaIdeal: parseFloat(item.temperaturaIdeal),
                  toxicidadParaMascotas: Boolean(item.toxicidadMascotas),
                }));
                console.log('este es el map'+mappedProduct);
                setProduct(mappedProduct);
                
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
  
    const handlePurchase = (product: Product) => {
      const existingProduct = cartItems.find((item: { id: number; }) => item.id === product.id); // Usamos id en lugar de nombreProducto
      const currentQuantity = existingProduct ? existingProduct.cantidad ?? 0 : 0;
  
      if (product.stock > currentQuantity) {
        addToCart(product);
        setProduct(prevProducts =>
          prevProducts.map(p =>
            p.id === product.id ? { ...p, stock: p.stock - 1 } : p
          )
        );
        toggleSidebar();
      } else {
        alert('No hay suficiente stock disponible para este producto.');
      }
    };
  
    const handleRemove = (product: Product) => {
      const existingProduct = cartItems.find((item: { id: number; }) => item.id === product.id); // Usamos id en lugar de nombreProducto
      if (existingProduct && existingProduct.cantidad) {
        removeFromCart(product);
        setProduct(prevProducts =>
          prevProducts.map(p =>
            p.id === product.id ? { ...p, stock: p.stock + 1 } : p
          )
        );
      }
    };
  
    return (
      <div>
        <h2>Productos</h2>
        {loading && <p>Cargando...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
          {product.map((product) => {
            const currentItem = cartItems.find((item: { id: number; }) => item.id === product.id); // Usamos id en lugar de nombreProducto
            const quantityInCart = currentItem ? currentItem.cantidad ?? 0 : 0;
  
            return (
              <li key={product.id}>
                <h3>{product.nombreProducto}</h3>
                {product.imagenProducto.length > 0 && (
                  <img
                    src={product.imagenProducto[0]}
                    alt={product.nombreProducto}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
                <p><strong>Descripción:</strong> {product.descripcionProducto}</p>
                <p><strong>Precio:</strong> ${product.precio.toFixed(2)}</p>
                <p><strong>Categoría:</strong> {product.categoria}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
  
                <button onClick={() => handlePurchase(product)}>Agregar al carrito</button>
  
                {quantityInCart > 0 && (
                  <div>
                    <span>Cantidad en el carrito: {quantityInCart}</span>
                    <button onClick={() => handleRemove(product)}>Eliminar del carrito</button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  
  export default DataFetcher;
  
