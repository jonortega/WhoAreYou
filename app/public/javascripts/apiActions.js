async function aniadir() {
    let player = {"id": document.getElementById("id").value, 
    "name": document.getElementById("name").value, 
    "birthdate": document.getElementById("birthdate").value, 
    "nationality": document.getElementById("nationality").value, 
    "teamId": document.getElementById("teamId").value, 
    "position": document.getElementById("position").value, 
    "number": document.getElementById("number").value, 
    "leagueId": document.getElementById("leagueId").value}

    console.log(player)

    await fetch("http://localhost:4000/api/v1/players/add", {
        method: 'post',
        headers: {
            'Content-Type':'application/json'
        },
        body: player
    }).then(r => {console.log(r)})
}

async function buscar(){
    await fetch('http://localhost:4000//api/v1/players'+document.getElementById).then(console.log(res))
}

// // modificar.addEventListener('click', (event)=> {
// //    modificar();
// // })

// async function modificarBoton(){
//     await fetch('http://localhost:4000/api/v1/players/edit', {
//         method: 'PUT',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({id: id, name: name, birthdate: birthdate, nationality: nationality, teamId: teamId, position: position, number: number, leagueId: leagueId})
//     })
// }

// // eliminar.addEventListener('click', (event)=> {
// //     eliminar();
// // })

// async function eliminarBoton(){
//     await fetch('http://localhost:4000/api/v1/players/remove'+id).then(console.log(res))
// }

