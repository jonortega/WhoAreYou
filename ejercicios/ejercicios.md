# 3.1
## 1-
```js
x = await fetch('http://api.football-data.org/v4/competitions').then(r => r.json())
x.competitions.filter(element => element.id == 2014)
```
## 2-
```js
x = await fetch('http://api.football-data.org/v4/competitions').then(r => r.json())
x.competitions.filter(elem => elem.plan == "TIER_ONE")
```
## 3-
```js
x = await fetch('http://api.football-data.org/v4/competitions').then(r => r.json())
x.competitions.filter(elem => elem.area.name=="Spain")
```
## 4-
```js
x = await fetch('http://api.football-data.org/v4/competitions').then(r => r.json())
x.competitions.filter(elem => elem.plan=="TIER_ONE" && (elem.area.code=="ESP" || elem.area.code=="DEU" || elem.area.code=="ENG" || elem.area.code=="FRA"))
```
## 5-
```js
x = await fetch('http://api.football-data.org/v4/competitions').then(r => r.json())
x.competitions.filter(elem => elem.plan=="TIER_ONE" && (elem.area.code=="ESP" || elem.area.code=="DEU" || elem.area.code=="ENG" || elem.area.code=="FRA") && elem.name!="Championship")
```
## 6-
```js
x = await fetch('http://api.football-data.org/v4/competitions').then(r => r.json())
y = x.competitions.filter(elem => elem.plan=="TIER_ONE" && (elem.area.code=="ESP" || elem.area.code=="DEU" || elem.area.code=="ENG" || elem.area.code=="FRA") && elem.name!="Championship")
y.map(elem => elem.id)
```
# 5.4
## 1-
```js
// Cargar la base de datos
premiere = {"Copiar por completo el JSON premiere.json"}
// Datos del equipo Arsenal FC
premiere.teams.filter(team => team.name=="Arsenal FC")
// Nombres de todos los jugadores del Arsenal FC
premiere.teams.filter(team => team.name=="Arsenal FC")[0].squad.map(member => member.name)
// Lista de todos los jugadores del Arsenal FC
premiere.teams.filter(team => team.name=="Arsenal FC").map(member => member.squad)
```
```js
// Añadir nuevos campos leagueId y teamId a todos los jugadores de la Premiere League
premiere.teams.forEach(team => {
    let id = team.id
    team.squad.forEach( member => {
        member["leagueId"] = 2021
        member["teamId"] = id
    })
})
```
```js
// Cambiar el nombre del campo dateOfBirth a birthDate a todos los jugadores de la Premiere League
premiere.teams.forEach(team => {
    team.squad.forEach( member => {
        member.birthDate = member.dateOfBirth
        delete member.dateOfBirth
    })
})
```
```js
// Cambiar al forma de representar las posiciones de todos los jugadores de la Premiere League
premiere.teams.forEach(team => {
    team.squad.forEach( member => {
        if(member.position=="Offence") {member.position = "FW"}
        else if(member.position=="Goalkeeper") {member.position = "GK"}
        else if(member.position=="Midfield") {member.position = "MF"}
        else if(member.position=="Defence") {member.position = "DF"}
    })
})
```