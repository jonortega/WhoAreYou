# 1.1

## 1-
Se usa para crear un directorio de forma sincrona.
{recursive: true} significa que se pueden crear directorios dentro de directorios.

## 2-
fs.createWriteStream() crea un elemento en el path indicado al cual se permite escribir.

## 3-
200: indica que todo ha ido correctamente.
302: indica que el recurso solicitado ha sido movido temporalmente a la URL dada por las cabeceras
401: indica que la petición (request) no ha sido ejecutada porque carece de credenciales válidas de autenticación para el recurso solicitado.
429: indica que el usuario ha enviado muchas peticiones (request) en un periodo de tiempo determinado ("limitación de velocidad")
500: indica que el servidor encontró una condición inesperada que le impide completar la petición.

## 4-
res.body.pipe crea una "tuberia" (pipe) para relacionar el flujo de lectura con el fujo de escritura.