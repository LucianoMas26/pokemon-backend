PASOS PARA LEVANTAR EL BACKEND Y CONECTARSE A LA BASE DE DATOS
1- Descargar psql o pgAdmin para ingresar a la base de datos (Luego cambiare las contraseñas asi que no se preocupen)
2- Ingresar las siguientes credenciales para acceder a la base de datos desde psql 
Server (Servidor): localhost
Database (Base de datos): postgres
Port (Puerto): 5432 (este es el puerto predeterminado para PostgreSQL)
Username (Nombre de usuario): postgres
Contraseña para usuario postgres: 37450853 (la contraseña proporcionada)
3- Desde la terminal del proyecto abrir dos terminales
* En la primera terminal ejecutar el comando npx nodemon 
dist/index.js
* En la segunda terminal ejecutar npx tsc --watch
