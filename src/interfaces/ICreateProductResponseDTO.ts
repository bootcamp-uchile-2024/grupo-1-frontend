export interface ICreateProductsResponseDTO {

    codigoProducto: number; //codigo asignado a un producto
    idProducto: number; //numero correlativo a la posicion en la base datos
    categoria: string; //plantas/ maceteros/ sustratos/ fertilizantes/ controldeplagas
    nombreProducto: string;
    urlImagen: string[];
    descripcionProducto: string;
    valorProducto: number;
    descuento?: string;
    valorNormal?: number
    habitat?: string; //(Interior/Exterior)
    luz?: string; //(Directa/Indirecta)
    frecuenciaRiego?: string;
    sustratoIdeal?: string;
    fertilizanteIdeal?: string;
    cuidadosPrincipales?: string;
    color?: string;
    alto?: string;
    diametro?: string;
    peso?: string
    material?: string;
    capacidad?: string; //litros
    origen?: string; //importado/ nacional
    garantiaProveedor?: string; //garantía proporcionada por el proveedor 1 año/ 2 años/10 años etc
    garantiaMinimaLegal?: string; //6 meses, a partir de la entrega del producto.
    composicion?: string;
    textura?: string;
    retencionDeHumedad?: string;
    drenaje: string;
    plantasRecomendadas: string;
    observaciones: string;
    composicionNPK: string;
    tipoDeFertilizante: string;
    beneficios: string;
    frecuenciaDeAplicacion: string;
    tipoDeProducto: string;
    métodoDeAplicacion: string;
}