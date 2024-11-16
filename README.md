# Plantopía

Nuestra aplicación web está desarrollada con React, TypeScript y Vite. Esta aplicación es un e-commerce de plantas y productos para mantener vivas tus plantas.

## Requisitos

Asegúrate de tener instalado los siguientes softwares:

- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [npm](https://www.npmjs.com/) (versión 6 o superior)
- [docker desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (versión 27 o superior. Sigue los pasos en el link indicado)

## Instalación

Para configurar el proyecto en tu máquina, debes hacer lo siguiente:


### 1.  Clona el repositorio:   
  ```bash
    git clone https://github.com/bootcamp-uchile-2024/grupo-1-frontend.git
  ```
### 2.  Navega al directorio del proyecto:
  ```bash
    cd grupo-1-frontend
  ```
### 3.  Instala las dependencias:
  ```bash
    npm install
  ```
### 4.  Para iniciar la aplicación en modo de desarrollo, ejecuta:
  ```bash
    npm run dev
  ```
### 5. Para levantar la imagen docker, asegúrate de que docker desktop esté activo en tu máquina:
    
####   Para iniciar el compose de docker, ejecuta:
  ```bash
    npm run docker-compose-up
  ```
####   Para finalizar el compose de docker, ejecuta:
  ```bash
    npm run docker-compose-down
  ```

## Credenciales de Acceso

Utiliza las siguientes credenciales para acceder a la aplicación:

#### Usuario:

* Usuario: `user`
* Password: `user`

#### Administrador:

* Usuario: `admin`
* Password: `admin`

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para encontrar y arreglar problemas en el código.