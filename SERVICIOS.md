# Servicios

## Listar productos

__Descripción__: Obtiene una lista de productos. <br>
__Ruta__: src\interfaces\IListProductsRequestDTO.ts<br>
__Ruta__: src\interfaces\IListProductsResponseDTO.ts<br>
__Url__: https://github.com/bootcamp-uchile-2024/grupo-1-frontend.git<br>

### RequestDTO

```typescript
interface IListProductsRequestDTO {
    page: number;
    limit: number;
}
```

### ResponseDTO

```typescript
interface IListProductsResponseDTO {
    total: number;
    products: ProductDTO[]
}

interface ProductDTO {
    id: number;
    name: string;
    price: number;
}
```

## Crear producto

__Descripción__: Obtiene una lista de productos. <br>
__Ruta__: src\interfaces\ICreateProductRequestDTO.ts<br>
__Ruta__: src\interfaces\ICreateProductResponseDTO.ts<br>
__Url__: https://github.com/bootcamp-uchile-2024/grupo-1-frontend.git<br>

### RequestDTO

```typescript
interface ICreateProductRequestDTO {
    name: string;
    price: number;
}
```

### ResponseDTO

```typescript
interface ICreateProductResponseDTO {
    id: number;
    name: string;
    price: number;
}
```