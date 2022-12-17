import fs from 'fs'
import fetch from 'node-fetch'

const writepath = 'json/leagues/'

fs.mkdirSync(writepath, { recursive: true })

try {
    //read leagues file into an array of lines
    const data = fs.readFileSync('leagues.txt', 'utf-8').split("\n")
    data.forEach((elem, idx) => {
        const url = `https://playfootball.games/media/competitions/${elem}.png`
        fetch(url).then(res => {
            //check status
            if (res.status === 200) {
                res.body.pipe(fs.createWriteStream(`${writepath}${elem}.png`))
            } else {
                console.log(`status: ${res.status} line: ${idx} elem: ${elem} not found`)
            }
        }).catch(err => console.log(err))
    })
} catch (err) {
    console.log(err)
}

const writepath1 = 'json/nationalities/'

fs.mkdirSync(writepath1, { recursive: true })

try {
    //read leagues file into an array of lines
    const data = fs.readFileSync('nationalities.txt', 'utf-8').split("\n")
    data.forEach((elem, idx) => {

        const url = `https://playfootball.games/who-are-ya/media/nations/${elem}.svg`
        const uri = encodeURI(url)
        console.log("req.url: " + uri)
        fetch(uri).then(res => {
            //check status
            console.log("res.url: " + res.url)
            if (res.status === 200) {
                res.body.pipe(fs.createWriteStream(`${writepath1}${elem}.svg`))
            } else {
                console.log(`status: ${res.status} line: ${idx} elem: ${elem} not found`)
            }
        }).catch(err => console.log(err))
    })
} catch (err) {
    console.log(err)
}