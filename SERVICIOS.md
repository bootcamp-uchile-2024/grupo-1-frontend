# Servicios

## Crear producto

__Descripción__: Crea un producto. <br>
__Ruta__: src\interfaces\ICreateProductRequestDTO.ts<br>
__Ruta__: src\interfaces\ICreateProductResponseDTO.ts<br>
__Url__: https://github.com/bootcamp-uchile-2024/grupo-1-frontend.git<br>

### RequestDTO

```typescript
interface ICreateProductsRequestDTO {

    idProducto: number;
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

```

### ResponseDTO

```typescript
interface ICreateProductsResponseDTO {

    idProducto: number;
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
```

## Obtener Lista de productos

__Descripción__: Obtiene una lista de productos. <br>
__Ruta__: src\interfaces\IGetProductsResponseDTO.ts<br>
__Url__: https://github.com/bootcamp-uchile-2024/grupo-1-frontend.git<br>

### ResponseDTO

```typescript
// Obtiene los datos de IGetProductsResponseDTO.ts
import { ICreateProductsResponseDTO } from './ICreateProductResponseDTO';

export interface IGetProductsResponseDTO {
  codigoRespuesta: string; // Código de respuesta
  descripcionRespuesta: string; // Descripción de la respuesta
  productos: ICreateProductsResponseDTO[]; // Arroja Lista de productos
}
```

## Obtener un producto

__Descripción__: Obtiene un producto. <br>
__Ruta__: src\interfaces\IGetProductResponseDTO.ts<br>
__Url__: https://github.com/bootcamp-uchile-2024/grupo-1-frontend.git<br>

### ResponseDTO

```typescript
// Obtiene los datos de ICreateProductsResponseDTO.ts
import { ICreateProductsResponseDTO } from './ICreateProductResponseDTO';

export interface IGetProductResponseDTO {
  codigoRespuesta: string; // Código de respuesta ej: 200 OK
  descripcionRespuesta: string; // Descripción de la respuesta ej: (la consulta del producto ha sido exitosa)
  productos: ICreateProductsResponseDTO; // Retorna un producto
}
```

## Crear usuaio

__Descripción__: Crea un usuario. <br>
__Ruta__: src\interfaces\ICreateUserRequestDTO.ts<br>
__Ruta__: src\interfaces\ICreateUserResponseDTO.ts<br>
__Url__: https://github.com/bootcamp-uchile-2024/grupo-1-frontend.git<br>

### RequestDTO

```typescript
export interface ICreateUserRequestDTO {

    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    fechaNacimiento: string;
    rut:string;
    pais:string;
    region: string;
    comuna: string;
    calle: string;
    numero: string;
    depto: string;
    email: string;
    telefono: string;
}
```
### ResponseDTO

```typescript
export interface ICreateUserResponseDTO {

    codigoRespuesta: string; // Código de respuesta ej: 201 Created
    descripcionRespuesta: string; // Descripción de la respuesta ej: (la creación de usuario ha sido existosa)
}
```

## Obtener usuario

__Descripción__: Obtiene los datos de un usuario. <br>
__Ruta__: src\interfaces\IGetUserResponseDTO.ts<br>
__Url__: https://github.com/bootcamp-uchile-2024/grupo-1-frontend.git<br>

### ResponseDTO

```typescript
// Obtiene los datos de IGetProductsResponseDTO.ts
import { ICreateUserResponseDTO } from './ICreateUserResponseDTO';

export interface IGetUserResponseDTO {
  codigoRespuesta: string; // Código de respuesta ej: 200 OK
  descripcionRespuesta: string; // Descripción de la respuesta ej: (la consulta de usuario ha sido exitosa)
  productos: ICreateUserResponseDTO; // Retorna los datos de Usuario 
}
```

