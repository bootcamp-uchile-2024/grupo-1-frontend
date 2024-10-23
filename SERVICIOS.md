# Servicios del proyecto

## Servicio Catálogo Plantas

**Descripción**: Muestra el catálogo de plantas disponibles. <br>
**Método HTTP**: GET<br>
**End Point**: https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Planta<br>
**Url**: http://localhost:5173/plantas<br>

## Servicio Catálogo Maceteros

**Descripción**: Muestra el catálogo de maceteros disponibles. <br>
**Método HTTP**: GET<br>
**End Point**: https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Macetero<br>
**Url**: http://localhost:5173/maceteros<br>

## Servicio Catálogo Fertilizantes

**Descripción**: Muestra el catálogo de fertilizantes disponibles. <br>
**Método HTTP**: GET<br>
**End Point**: https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Fertilizantes<br>
**Url**: http://localhost:5173/fertilizantes<br>

## Servicio Catálogo Sustratos

**Descripción**: Muestra el catálogo de sustratos disponibles. <br>
**Método HTTP**: GET<br>
**End Point**: https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Sustrato<br>
**Url**: http://localhost:5173/sustratos<br>

## Servicio Catálogo Control de Plagas

**Descripción**: Muestra el catálogo de productos de control de plagas disponibles. <br>
**Método HTTP**: GET<br>
**End Point**: https://plantopia.koyeb.app/productos/catalogo/categoria?tipo=Control%20Plagas<br>
**Url**: http://localhost:5173/control-de-plagas<br>

## Creación de Productos

**Descripción**: Permite la creación de nevos productos a través de formulario. <br>
**Método HTTP**: POST<br>
**End Point**: -<br>
**Url**: http://localhost:5173/admin<br>

## Servicio de Autenticación de usuarios

**Descripción**: Permite la autenticación de usuarios a través de formulario. <br>
**Método HTTP**: POST<br>
**End Point**: -<br>
**Url**: http://localhost:5173/login<br>

## Interfaces

```typescript
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
```

### ResponseDTO

```typescript
export interface ICreateProductPlantasResponseDTO {
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
```
## Crear producto Maceteros

__Descripción__: Crea un producto de categoría Maceteros. <br>
__Ruta__: src\interfaces\ICreateProductMaceterosRequestDTO.ts<br>
__Ruta__: src\interfaces\ICreateProductMaceterosResponseDTO.ts<br>
__Url__: https://github.com/bootcamp-uchile-2024/grupo-1-frontend.git<br>

### RequestDTO

```typescript
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
```

### ResponseDTO

```typescript
export interface ICreateProductMaceterosResponseDTO {

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
```

## Crear producto Fertilizantes

__Descripción__: Crea un producto de categoría Fertilizantes. <br>
__Ruta__: src\interfaces\ICreateProductFertilizantesRequestDTO.ts<br>
__Ruta__: src\interfaces\ICreateProductFertilizantesResponseDTO.ts<br>
__Url__: https://github.com/bootcamp-uchile-2024/grupo-1-frontend.git<br>

### RequestDTO

```typescript
export interface ICreateProductFertilizantesRequestDTO {
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
    composicionNPK: string; //10
    presentacion: string; //11
    frecuenciaDeAplicacion: string; //12 
    tipoDeFertilizante: string; //13
    plantaRecomendadas: string[]; //14 (Nombre Producto/ Codigo Producto)
    observaciones: string; //15
}
```

### ResponseDTO

```typescript
export interface ICreateProductFertilizantesResponseDTO {
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
    composicionNPK: string; //10
    presentacion: string; //11
    frecuenciaDeAplicacion: string; //12 
    tipoDeFertilizante: string; //13
    plantaRecomendadas: string[]; //14 (Nombre Producto/ Codigo Producto)
    observaciones: string; //15
}
```

## Crear producto Sustratos

__Descripción__: Crea un producto de categoría Sustratos. <br>
__Ruta__: src\interfaces\ICreateProductSustratosRequestDTO.ts<br>
__Ruta__: src\interfaces\ICreateProductSustratosResponseDTO.ts<br>
__Url__: https://github.com/bootcamp-uchile-2024/grupo-1-frontend.git<br>

### RequestDTO

```typescript
export interface ICreateProductSustratosRequestDTO {
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
    composicion: string; //10
    textura: string; //11 (las opciones son)
    drenaje: string; //12 (Baja/Media/Alta)
    plantasRecomendadas: string[]; //13 (codigo del producto por negocio del producto)
    observaciones: string; //14
}
```

### ResponseDTO

```typescript
export interface ICreateProductSustratosResponseDTO {
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
    composicion: string; //10
    textura: string; //11 (las opciones son)
    drenaje: string; //12 (Baja/Media/Alta)
    plantasRecomendadas: string[]; //13 (codigo del producto por negocio del producto)
    observaciones: string; //14
}
```

## Crear producto Control de Plagas

__Descripción__: Crea un producto de categoría Control de Plagas. <br>
__Ruta__: src\interfaces\ICreateProductControlDePlagasRequestDTO.ts<br>
__Ruta__: src\interfaces\ICreateProductControlDePlagasResponseDTO.ts<br>
__Url__: https://github.com/bootcamp-uchile-2024/grupo-1-frontend.git<br>

### RequestDTO

```typescript
export interface ICreateProductControlDePlagasRequestDTO {
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
```

### ResponseDTO

```typescript
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
```

## POR DEFINIR Obtener Lista de productos

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

## POR DEFINIR Obtener un producto

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

## Crear usuario

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

