export interface ICreateProductControlDePlagasResponseDTO {
    idProducto: number; //id producto (este codigo te lo da la base de datos segun la posición en la base de datos)
    nombreProducto: string; //1
    imagenProducto: string[]; //2 (array de urls)
    precioProducto: number; //3 (precio del producto final incluido el descuento)
    descuento?: number; //4 (descuento en el precio del producto)
    precioNormal: number //5 (precio normal del producto sin descuento)
    coberturaDeDespacho: string[]; //7 (Región Metropolitana/ Región de Ohiggins/ Región de Valparaíso/ Todo el país)
    stock: number; //8 cantidad de productos en stock
    descripcionProducto: string; //9 (descripción breve y concisa sobre el producto)
    categoria: string; // ID (1 =plantas/ 2= maceteros/ 3=sustratos/ 4= fertilizantes/ 5=controlDePlagas)
    codigoProducto: string; //codigo asignado a un producto por negocio (PL01/ MC01/ SU01/ FE01/ CP01)
    valoracion?: number; //21 (0 a 5) valoracion asignado a un producto
    numeroVentas?: number; //numero de ventas de un producto
    tipoDePlaga: string; //10 (nombre de la plaga a controlar)
    composicion: string; //11 (descripción de la composición del producto)
    metodoDeAplicacion: string; //12 (descripcion del método de aplicación del producto)
    frecuenciaDeAplicacion: string; //13 (descripcion de la frecuencia de aplicación del producto)
    precauciones: string; //14 (descripcion de las precauciones a seguir)
    eficacia: string; //15 (media-alta)
    toxicidad: boolean; //16 (Si o No)
}
