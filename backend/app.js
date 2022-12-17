import fs from 'fs'
import fetch from 'node-fetch'

const writepath = 'json/leagues/'

//Se usa para crear un directorio de forma sincrona.
//Hace que devuelva la ruta del primer directorio creado. ??ESTO MIRAR PORQUE NO ESTOY SEGURO
fs.mkdirSync(writepath, {recursive:true})

try{
    //read leagues file into an array of lines
    const data = fs.readFileSync('leagues.txt', 'utf-8').split("\n")
    data.forEach((elem, idx) => {
        const url = `https://playfootball.games/media/competitions/${elem}.png`
        fetch(url).then(res => {
            //check status
            // 200: indica que todo ha ido correctamente.
            // 302: indica que el recurso solicitado ha sido movido temporalmente a la URL dada por las cabeceras
            // 401: indica que la petición (request) no ha sido ejecutada porque carece de credenciales válidas de autenticación para el recurso solicitado.
            // 429: indica que el usuario ha enviado muchas peticiones (request) en un periodo de tiempo determinado ("limitación de velocidad")
            // 500:  indica que el servidor encontró una condición inesperada que le impide completar la petición.
            if(res.status === 200) {
                //res.body.pipe crea una "tuberia" (pipe) para relacionar el flujo de lectura con el fujo de escritura. ??ESTO MIRAR PORQUE NO ESTOY SEGURO
                //fs.createWriteStream() crea un elemento en el path indicado en el cual se permite escribir. ??ESTO MIRAR PORQUE NO ESTOY SEGURO
                res.body.pipe(fs.createWriteStream(`${writepath}${elem}.png`))
            }else {
                console.log(`status: ${res.status} line: ${idx} elem: ${elem} not found`)
            }
        }).catch(err => console.log(err))
    })
}catch(err) {
    console.log(err)
}

const writepath1 = 'json/nationalities/'

try{
    //read leagues file into an array of lines
    const data = fs.readFileSync('nationalities.txt', 'utf-8').split("\n")
    data.forEach((elem, idx) => {
        const url = `https://playfootball.games/who-are-ya/media/nations/${elem}.svg`
        fetch(url).then(res => {
            //check status
            if(res.status === 200) {
                res.body.pipe(fs.createWriteStream(`${writepath1}${elem}.svg`))
            }else {
                console.log(`status: ${res.status} line: ${idx} elem: ${elem} not found`)
            }
        }).catch(err => console.log(err))
    })
}catch(err) {
    console.log(err)
}