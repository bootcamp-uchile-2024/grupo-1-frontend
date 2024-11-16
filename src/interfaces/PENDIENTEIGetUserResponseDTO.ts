// Obtiene los datos de IGetProductsResponseDTO.ts
import { ICreateUserResponseDTO } from './ICreateUserResponseDTO';

export interface IGetUserResponseDTO {
  codigoRespuesta: string; // Código de respuesta ej: 200 OK
  descripcionRespuesta: string; // Descripción de la respuesta ej: (la consulta de usuario ha sido exitosa)
  productos: ICreateUserResponseDTO; // Retorna los datos de Usuario 
}