async function aniadir() {
    let player = {
        "id": document.getElementById("id").value,
        "name": document.getElementById("name").value,
        "birthdate": document.getElementById("birthdate").value,
        "nationality": document.getElementById("nationality").value,
        "teamId": document.getElementById("teamId").value,
        "position": document.getElementById("position").value,
        "number": document.getElementById("number").value,
        "leagueId": document.getElementById("leagueId").value
    }

    let response = await fetch("http://localhost:3000/api/v1/players/add", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(player)
    }).then(r => r.text())

    document.getElementById("notification").innerHTML = response
}

function replaceContent(page) {
    document.open();
    document.write(page);
    document.close();
}

async function buscar() {
    let id = document.getElementById("id").value
    let page = await fetch('http://localhost:3000/api/v1/players/' + id).then(r => r.text())
    replaceContent(page)
}

async function editar() {
    let player = {
        "id": document.getElementById("id").value,
        "name": document.getElementById("name").value,
        "birthdate": document.getElementById("birthdate").value,
        "nationality": document.getElementById("nationality").value,
        "teamId": document.getElementById("teamId").value,
        "position": document.getElementById("position").value,
        "number": document.getElementById("number").value,
        "leagueId": document.getElementById("leagueId").value
    }

    let response = await fetch('http://localhost:3000/api/v1/players/edit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
    }).then(r => r.text())

    document.getElementById("notification").innerHTML = response
}

async function eliminar() {
    let id = document.getElementById('id').value
    let response = await fetch('http://localhost:3000/api/v1/players/remove/' + id).then(r => r.text())

    document.getElementById("notification").innerHTML = response
}

