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

# 1.3

## 2-
```js
encodeURI(url)
```

# 1.5
```js
jq -er 'map(.teamId) | .[]' fullplayers.json | Sort -Unique > teamIDs.txt
```
```js
const writepath2 = 'json/coatOfArms/'

fs.mkdirSync(writepath2, { recursive: true })

try {
    //read leagues file into an array of lines
    const data = fs.readFileSync('teamsIDs1.txt', 'utf-8').split("\n")
    data.forEach((elem, idx) => {
        console.log(elem)
        const url = `https://cdn.sportmonks.com/images/soccer/teams/${parseInt(elem)%32}/${elem}.png`
        
        fetch(url).then(res => {
            //check status
            console.log("res.url: " + res.url)
            if (res.status === 200) {
                res.body.pipe(fs.createWriteStream(`${writepath2}${elem}.png`))
            } else {
                console.log(`status: ${res.status} line: ${idx} elem: ${elem} not found`)
            }
        }).catch(err => console.log(err))
    })
} catch (err) {
    console.log(err)
}
```
