# Extendeal - Challenge
En este documento se detallará los pasos para la instalación de la aplicación.

#### Contenido

- [Instalación de Docker](#instalación-de-docker)
- [Configuración de variables de entorno](#configuración-de-variables-de-entorno)
  -   [Opción 1](#opción-1---creación-del-archivo-de-entorno) Creación del archivo de entorno .env
  -   [Opción 2](#opción-2---configuración-de-variables-de-entorno-desde-la-ejecución-de-la-imagen-docker) Configuración de variables de entorno desde la ejecución de la imagen Docker
- [Creación de la imagen docker de la aplicación](#creación-de-la-imagen-docker-de-la-aplicación)
- [Creación del contenedor de Docker utilizando la imagen creada](#creación-del-contenedor-de-docker-utilizando-la-imagen-creada)
- [Finalización de instalación](#finalización-de-instalación)
  -   [Login Page](#login-page)
  -   [Home Page](#home-page)
-  [Storybooks](#storybooks)

<br>

## [Instalación de Docker][toc]

En el caso que no se tenga instalado el motor de Docker se debe instalar usando el siguiente link: https://docs.docker.com/engine/install/

<br>

## [Configuración de variables de entorno][toc]

### Opción 1 - Creación del archivo de entorno

Desde la raiz del proyecto crear el archivo <b>.env</b> y agregar las siguientes dos propiedades:</br>
<em>REACT_APP_DOMAIN_SERVER=[URL_SERVER]</em> -> <b>URL_SERVER</b> es la url del servidor de películas donde fue instalado.
<em>REACT_APP_VERSION=$npm_package_version</em>

### Opción 2 - Configuración de variables de entorno desde la ejecución de la imagen Docker

Usando el comando <b>-e</b> se podrá configurar las variables de entorno, por ejemplo:

```
docker run -d -p 3000:3000 -e "REACT_APP_DOMAIN_SERVER=http://localhost:3001" -e "REACT_APP_VERSION=$npm_package_version" extendeal
```

<br>

## [Creación de la imagen docker de la aplicación][toc]

### Opción 1 - Creación desde el IDE (VsCode) + Extensión Docker

Desde el IDE (VsCode) instalar la extensión oficial de Docker y luego ejecutar el <b>Build image</b> sobre el archivo <b>"Dockerfile"</b>. </br></br>
<b>Nota:</b> Indicar el nombre de imagen que deseen. Sugerencia de formato <b>[USER_GIT_HUB]/[NAME_APP]:latest</b>

### Opción 2 - Por linea de comando

Desde la terminal, ir a la carpeta del proyecto y ejecutar el siguiente comando:
```
docker build . -t [USER_GIT_HUB]/[NAME_APP]:latest
```


<br>

## [Creación del contenedor de Docker utilizando la imagen creada][toc]

Desde la terminal ejecutar el comando: <em>docker run -d -p [PORT]:3000 [IMAGE_NAME]</em> </br></br>
<b>Nota:</b> Como <b>PORT</b> pueden utilizar 3000 que es el valor por default, pero si el puerto se tiene ocupado por otra aplicación podrían cambiarlo. </br>
Por otro lado, en el caso de ir por la opción 2  <em>-e "REACT_APP_DOMAIN_SERVER=http://localhost:[PORT_SERVER]"</em>

<br>

## [Finalización de instalación][toc]

Una vez que el contenedor este corriendo se podrá validar desde su navegador que la URL: http://localhost:[PORT]/ se este ejecutando correctamente, donde deberá visualizar el login del aplicación: </br>


### Login Page
![Captura de pantalla 2024-03-27 152325](https://github.com/fmonte2022/extendeal/assets/104769503/9e03f455-6983-45e0-bdc0-2e29acb2452b)

Podrá acceder usando los siguientes accesos cargados: </br>
<b>Username:</b> admin  <b>Password:</b> admin</br>
<b>Username:</b> ruben  <b>Password:</b> ruben123

### Home Page
![Captura de pantalla 2024-03-27 152046](https://github.com/fmonte2022/extendeal/assets/104769503/4515d80a-1ec8-4f8d-8412-701aabd9f340)

<br>

#### [Storybooks][toc]

Se ha agregado el storybooks de algunos componentes construidos. Para poder verlos ejecutar:

```
npm run storybook
```

![Captura de pantalla 2024-04-03 003439](https://github.com/fmonte2022/extendeal/assets/104769503/dff42c7d-e219-4ad9-ba2c-188cc6cda0be)

[toc]: #contenido "Ir a la tabla de contenidos"
