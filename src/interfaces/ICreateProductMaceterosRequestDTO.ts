export interface ICreateProductMaceterosRequestDTO {

    idProducto: number; //id producto (este codigo te lo da la base de datos segun la posición en la base de datos)
    nombreProducto: string; //1
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
    alto: number; //10 (cm)
    ancho: number; //11 (cm)
    peso: number; //12 (kg)
    capacidad: number; //13 (litros)
    material: string; //14 (material del producto)
    color: string; //15 (color del producto)
    forma: string; //16 (circular - rectangular)
}

