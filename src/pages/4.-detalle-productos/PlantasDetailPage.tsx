import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProductDetailPage.css';

const PlantasDetailPage: React.FC = () => {
  const location = useLocation();
  const { plantas } = location.state || {};

  if (!plantas) {
    return <div>No se encontró el producto.</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h2>Detalle de Producto</h2>
      </div>

      <div className="detail-content">
        {/* Imagen del producto */}
        <div className="detail-image">
          <img src={plantas.imagenProducto[0]} alt={plantas.nombreProducto} />
        </div>

        {/* Información del producto */}
        <div className="detail-info">
          <h3 className="product-name">{plantas.nombreProducto}</h3>
          <p className="product-category">{plantas.categoria?.nombreCategoria}</p>
          <p className="product-description">{plantas.descripcionProducto}</p>
          <p className="product-price">
            <strong>Precio:</strong> ${plantas.precioNormal}
          </p>
          <p className="product-stock">
            <strong>Stock disponible:</strong> {plantas.stock}
          </p>

          {/* Botón de agregar al carrito */}
          <button className="add-to-cart-button">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default PlantasDetailPage;








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