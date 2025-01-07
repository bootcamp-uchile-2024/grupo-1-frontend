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
  const [planta, setPlanta] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://3.142.12.50:4000/productos/plantas/getbyid/${id}`);
        if (!response.ok) {
          throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }
        const plantaData = await response.json();
        setPlanta(plantaData.data);
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
        console.log(response);
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
      imagenProducto: planta.producto.imagenes[0]?.urlImagen || '',
      categoria: planta.producto.categoria
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
          {planta?.producto.imagenes?.length > 0 && (
            <img
              src={planta?.producto.imagenes[0]?.urlImagen?.includes('uploads/productos') ? `http://3.142.12.50:4000${planta?.producto.imagenes[0]?.urlImagen}` : planta?.producto.imagenes[0]?.urlImagen}
              alt={planta?.nombrePlanta}
            />
          )}
        </div>

        {/* Información del producto */}
        <div className="detail-info">
          <h3 className="product-name">{planta?.nombrePlanta}</h3>
          <p className="product-category">{planta?.producto.categoria.nombreCategoria}</p>
          <p className="product-description">{planta?.producto.descripcionProducto}</p>
          <p className="product-price">${planta?.producto.precioNormal.toFixed(2)}</p>
          <p className="product-stock">Stock: {planta?.producto.stock}</p>
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