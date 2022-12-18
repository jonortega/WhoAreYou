# Explicación general

## Organización de las carpetas
La carpeta _backend/_ ha sido donde hemos ido haciendo los ejercicios hasta ahora, pero ese no va a ser el backend real de la aplicación.  

El backend real que luego se usará, es lo que está dentro de la carpeta _app/_.  

Por ahora vamos haciendo las cosas por separado, pero cuando haya que subirlo a Azure, hay que pasar las cosas que haya en _backend/_ a _app/_.  

## Dudas
- Creo que cuando entres en http://localhost:3000 tiene que salir el _login.ejs_.
- Una vez iniciado sesión no sé a que URL hay que ir. Creo que lo que más sentido tiene es:
  - Ir a http://localhost:3000/user/ para mostrar el juego en sí (puede ser otra URL).
  - Ir a http://localhost:3000/admin/ y ahí enseñar el _form.ejs_ para poder modificar los datos de la BD.
  - Cuando el admin rellene ese formulario y le de a enviar, los datos se envían los diferentes endpoints de la API, dependiendo de lo que quiera hacer.

# Tareas que hay que hacer (elegid alguna):

## Obtener los símbolos de los jugadores
- **Lugar:** /backend/app.js
- El `try-catch` que está comentado al final.
- Hacer que haga 10 peticiones `fetch` por segundo usando `setInterval()`.
> **Nota:** Todavía no podemos probarlo porque nos falta un _platerIDs.txt_ limpio.

## Crear un formulario con express-validator
- **Lugar:** /app/form.ejs
- Este formulario sirve para hacer las llamadas a la API.
- Por ahora solo tiene que visualizar los datos recibidos en la consola del servidor cuando se añade un nuevo jugador.
- Hay que verificar los datos que se meten con **express-validator**.
- Si acepta los datos, el servidor mostratá en consola los datos del POST.
- Más adelante hay que conectar este formulario con todos los endpoints de la API para que modifique la BD directamente.

## Crear una pantalla de inicio de sesión con express-session
- **Lugar:** /app/views/login.ejs
- Hay dos tipos de usuario: _admin_ y _user_
- Crear un formulario para el login.
- Campos para rellenar:
  - Nombre
  - Apellido
  - Email
  - Contraseña
- **Lugar:** /app/app.js
- Usar **express-session** para poder inicar sesión y asignar los roles.
- En MongoDB se van a guardar los datos de los usuarios de antemano diciendo si son _admin_ o _user_.

## Programar los endpoints de la API
- **Lugar:** /app/routes/players.js
- Por ahora solo tiene que hacer `res.send()` al cliente con los datos.
- Los datos se obtienen y se modifican en MongoDB.
- Más adelante hay que hacer que se visualicen los datos devueltos en el formulario con `res.render()`.
- **Formato de la API:**
  | METHOD | ENDPOINTS                  | Funcionalidad                                           |
  | -----: | :------------------------- | :------------------------------------------------------ |
  |    GET | /api/v1/players/:id        | Devuelve los datos del jugador con id = :id.            |
  |    GET | /api/v1/players/remove/:id | Elimina al jugador de la BD.                            |
  |   POST | /api/v1/players/add        | Añade a la BD un nuevo jugador con los datos recibidos. |
  |    PUT | /api/v1/players/edit/:id   | Modifica los datos del jugador de la BD.                |

  > **Nota:** Los datos de los jugadores están en MongoDB -> footballdata/players

## Actualizar los URL de donde se hace fetch para obtener los datos
- Al principio de todo hemos usado la API de https://media.api-sports.io para obtener los datos.
- Ahora hay que cambiarlos por https://nuestrodominio.eus/football/. Por ejemplo:
  - https://nuestrodominio.eus/football/players/XXXX.png
  - https://nuestrodominio.eus/football/teams/...
  - https://nuestrodominio.eus/football/leagues/...
  
> **Nota:** no sé cómo hacer esto en Azure. Supongo que habrá que instalar MongoDB allí.

## Subirlo todo a Azure
- Cuando todo esté terminado, conectado y funcione bien en local.
- Esto va a dar problemas, no es muy simple.
- La profe había enviado un correo explicando un poco esta parte.