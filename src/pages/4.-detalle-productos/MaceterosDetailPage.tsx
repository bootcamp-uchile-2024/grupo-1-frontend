import {useLocation} from 'react-router-dom'

export default function MaceterosDatailPage() {
    const location = useLocation();
    const { maceteros } = location.state || {};  
    

    if (!maceteros) {
        return <div>No se encontró el producto.</div>;
    }

    

    return(
        <>
        <h2>Detalle de Macetero</h2>
        <div className='product-card-det'>
            <div>
                <h3>{maceteros.nombreProducto}</h3>
                <img src={maceteros.imagenProducto[0]} alt=""/>
            </div>
            <div>
            </div>
            <div>
                <p>precio: ${maceteros.precioNormal}</p>
                <p>{maceteros.descripcionProducto}</p>
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