export interface ICreateProductPlantasRequestDTO {
    idProducto: number; //id producto (este codigo te lo da la base de datos segun la posición en la base de datos)
    nombreProducto: string; //1
    nombreCientifico: string;
    imagenProducto: string[]; //2 (array de urls)
    precioProducto: number; //3 (precio del producto final incluido el descuento)
    descuento?: number; //4 (descuento en el precio del producto)
    precioNormal: number //5 (precio normal del producto sin descuento)
    coberturaDeDespacho: string[]; //7 (Región Metropolitana/ Región de Ohiggins/ Región de Valparaíso/ Todo el país)
    stock: number; //8 cantidad de productos en stock
    descripcionProducto: string; //9 (descripción breve y concisa sobre el producto)
    categoria: number; // ID (1 =plantas/ 2= maceteros/ 3=sustratos/ 4= fertilizantes/ 5=controlDePlagas)
    codigoProducto: string; //codigo asignado a un producto por negocio (PL01/ MC01/ SU01/ FE01/ CP01)
    valoracion?: number; //21 (0 a 5) valoracion asignado a un producto
    numeroVentas?: number; //numero de ventas de un producto
    habitat: string; //10 (Interior/Exterior/Interior o exterior).
    luz: string; //11 (Baja/Media/Alta)
    frecuenciaDeRiego: string; //12 (diario / semanal/ quincenal / mensual)
    sustratoSugerido?: string[]; //13 (Nombre Producto/ Codigo Producto)
    fertilizanteSugerido?: string[]; //14 (Nombre Producto/ Codigo Producto)
    tamanoMaximo: number; //15 (cm)
    humedadIdeal: string; //16 (baja/media / alta )
    temperaturaIdeal: number; //17 (°C)
    toxicidadParaMascotas: boolean; //18 (Boleano Si o No)
    tipoDeSuelo: string; //19 (Arenoso / Arcilloso / Limoso / Turba)
    dificultadDeCuidado: string; //20 (Alta/ media/ baja)
}


