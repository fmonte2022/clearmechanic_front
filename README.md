# ClearMechanic - Challenge
This document will detail the steps for installing the application.

#### Content

- [Docker Installation](#docker-instalation)
- [Set Environment Variables](#set-environment-variables)
  -   [Option 1](#option-1---creating-the-environment-file) Creating the environment file .env
  -   [Option 2](#option-2---set-environment-variables-from-docker-image-execution) Set environment variables from Docker image execution
- [Creating the docker image](#creating-the-docker-image)
- [Creating the Docker container using the created image](#creating-the-docker-container-using-the-created-image)
- [Run Tests](#run-tests)
- [Installation completion](#installation-completion)
  -   [Login Page](#login-page)
  -   [Home Page](#home-page)

<br>

## [Docker Installation][toc]

In case the Docker engine is not installed, it must be installed using the following link: https://docs.docker.com/engine/install/

<br>

## [Set Environment Variables][toc]

### Option 1 - Creating the environment file

From the root of the project create the file <b>.env</b> and add the following two properties:</br>
<em>REACT_APP_DOMAIN_SERVER=[URL_SERVER]</em> -> <b>URL_SERVER</b> is the url of the movies server where it was installed.
<em>REACT_APP_VERSION=$npm_package_version</em>

### Option 2 - Set environment variables from Docker image execution

Using the command <b>-e</b> you can configure environment variables, for example:  https://localhost:7250/api/

```
docker run -d -p 3000:3000 -e "REACT_APP_DOMAIN_SERVER=https://localhost:7250/api/" -e "REACT_APP_VERSION=$npm_package_version" clearmechanic
```

<br>

## [Creating the docker image][toc]

### Option 1 - Creation from the IDE (VsCode) + Extension Docker

From the IDE (VsCode) install the official Docker extension and then run the <b>Build image</b> about the file <b>"Dockerfile"</b>. </br></br>
<b>Note:</b> Please indicate the name of the image you want. Format suggestion <b>[USER_GIT_HUB]/[NAME_SERVER]:latest</b>

### Option 2 - By command line

From the terminal, go to the project folder and run the following command:
```
docker build . -t [USER_GIT_HUB]/[NAME_APP]:latest
```

<br>

## [Creating the Docker container using the created image][toc]

From the terminal run the command: <em>docker run -d -p [PORT]:3000 [IMAGE_NAME]</em> </br></br>
<b>Note:</b> As <b>PORT</b> you can use 3000 which is the default value, but if the port is occupied by another application you could change it. </br>
On the other hand, in the case of going for option 2 <em>-e "REACT_APP_DOMAIN_SERVER=http://localhost:[PORT_SERVER]"</em>

<br>

## [Run Tests][toc]

From the terminal run the command: <b>npm test</b>

<br>

## [Installation completion][toc]

Once the container is running you can validate from your browser that the URL: http://localhost:[PORT]/ is running correctly, where you should see the application login: </br>

### Login Page
<img width="858" alt="Captura de pantalla 2024-09-04 a las 1 58 04" src="https://github.com/user-attachments/assets/ad03fbbd-47ae-42e5-b1b0-ca0a27bdb42d">

You can access using the following loaded accesses: </br>
<b>Username:</b> admin  <b>Password:</b> admin</br>

### Home Page
<img width="1725" alt="Captura de pantalla 2024-09-04 a las 1 58 37" src="https://github.com/user-attachments/assets/4ffe885d-e93e-402e-a9ac-bdd6fbdce3c8">

<br>


[toc]: #content "Go to table of contents"
