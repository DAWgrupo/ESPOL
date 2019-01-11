# Pagos en Linea
Proyecto de la materia Ingenieria de Software II

## Instalación
### Dependencias del front-end
Instalación de NodeJs
> https://nodejs.org/es/download/

Instalación de Ionic CLI y Cordova
> npm install -g ionic cordova

Editor en línea
> https://creator.ionic.io

Ceación de nuevo proyecto
> ionic start nombre blank

Agregar plataformas
> ionic cordova platform add android

> ionic cordova platform add ios

## Dependencias del back-end
Instalación de Python 3.7
> https://www.python.org/downloads/

Instalación de Django Rest Framwork
> pip install django

> pip install djangorestframework

Instalación de PostgreSQL
> https://www.postgresql.org/download/


## Ejecución
Ejecución del API
> python manage.py makemigrations aplicacion

> python manage.py migrate

> python manage.py runserver

Ejecución del APP

#### Para debugging en el browser
> cross-env ENV='local' ionic serve



Ejecucion del APP en emulador
> ionic cordova emulate

