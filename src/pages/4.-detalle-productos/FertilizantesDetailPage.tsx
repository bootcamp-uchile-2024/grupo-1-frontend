import {useLocation} from 'react-router-dom'

export default function FertilizantesDatailPage() {
    const location = useLocation();
    const { fertilizantes } = location.state || {};  
    

    if (!fertilizantes) {
        return <div>No se encontró el producto.</div>;
    }

    

    return(
        <>
        <h2>Detalle de Producto</h2>
        <div className='product-card-det'>
            <div>
                <h3>{fertilizantes.nombreProducto}</h3>
                <img src={fertilizantes.imagenProducto[0]} alt=""/>
            </div>
            <div>
            </div>
            <div>
                <p>precio: ${fertilizantes.precioNormal}</p>
                <p>{fertilizantes.descripcionProducto}</p>
            </div>
        </div>
        </>
    );
}









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