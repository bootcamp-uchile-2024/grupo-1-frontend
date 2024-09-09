// Obtiene los datos de ICreateProductsResponseDTO.ts
import { ICreateProductsResponseDTO } from './ICreateProductResponseDTO';

export interface IGetProductResponseDTO {
  codigoRespuesta: string; // Código de respuesta ej: 200 OK
  descripcionRespuesta: string; // Descripción de la respuesta ej: (la consulta del producto ha sido exitosa)
  productos: ICreateProductsResponseDTO; // Retorna un producto
}