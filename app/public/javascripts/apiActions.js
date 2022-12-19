let id=document.getElementById('id').value
let name=document.getElementById('name').value
let birthdate=document.getElementById('birthdate').value
let nationality=document.getElementById('nationality').value
let teamId=document.getElementById('teamId').value
let position=document.getElementById('position').value
let number=document.getElementById('number').value
let leagueId=document.getElementById('leagueId').value

let aniadir=document.getElementById('aniadir')
let buscar=document.getElementById('buscar')
let modificar=document.getElementById('modificar')
let eliminar=document.getElementById('eliminar')

// aniadir.addEventListener('click', (event)=> {
//     aniadir();
// })

async function aniadir(){
    await fetch('http://localhost:4000/api/v1/players/add', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id: id, name: name, birthdate: birthdate, nationality: nationality, teamId: teamId, position: position, number: number, leagueId: leagueId})
    })
}

// buscar.addEventListener('click', (event)=> {
//     buscar();
// })

async function buscar(){
    await fetch('http://localhost:4000//api/v1/players'+id).then(console.log(res))
}

// modificar.addEventListener('click', (event)=> {
//    modificar();
// })

async function modificar(){
    await fetch('http://localhost:4000/api/v1/players/edit', {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id: id, name: name, birthdate: birthdate, nationality: nationality, teamId: teamId, position: position, number: number, leagueId: leagueId})
    })
}

// eliminar.addEventListener('click', (event)=> {
//     eliminar();
// })

async function eliminar(){
    await fetch('http://localhost:4000/api/v1/players/remove'+id).then(console.log(res))
}
