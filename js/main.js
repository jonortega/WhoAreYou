import { folder, leftArrow } from "./fragments.js";
import { fetchJSON } from "./loaders.js";

/*
Hemos hecho hasta 6.1.Ejercicios el numero 2. no sabemos
importar los datos de un json a traves de una funcion.

Yo he hecho el punto 3 (getSolution()) pero hay que comprobar
que funciona bien.

Despues de esto hay que hacer el 4 en un nuevo bramch de git
que se llame blurred.

Lo ultimo es hacer el git tag con el milestone1.

Luego seguir con lo resto.
*/


function differenceInDays(base) {
    let fecha = Date.now()
    let hoy = new Date(fecha)
    return Math.floor(Math.abs(hoy - base) / 1000 * 3600 * 24)
}

let difference_In_Days = differenceInDays(new Date("08-18-2022"));

window.onload = function () {
    document.getElementById(
        "gamenumber"
    ).innerText = difference_In_Days.toString();
    document.getElementById("back-icon").innerHTML = folder + leftArrow;
};

let game = {
    guesses: [],
    solution: {},
    players: [],
    leagues: []
};

function getSolution(players, solutionArray, difference_In_Days) {
    let idJugadorHoy = solutionArray[difference_In_Days - 1]
    let jugadorHoy = players.filter(player => player.id == jugadorHoy.id)[0]
    console.log(jugadorHoy)
    return jugadorHoy
}

Promise.all([fetchJSON("fullplayers"), fetchJSON("solution")]).then(
    (values) => {

        let solution;

        [game.players, solution] = values;

        game.solution = getSolution(game.players, solution, difference_In_Days);

        console.log(game.solution);

        document.getElementById(
            "mistery"
        ).src = `https://playfootball.games/media/players/${game.solution.id % 32
        }/${game.solution.id}.png`;


        // YOUR CODE HERE
        let addRow = setupRows( /* THIS NEEDS A PARAMETER */);
        // get myInput object...
        // when the user types a number an press the Enter key:
        addRow( /* the ID of the player, where is it? */);
        //  


    }
);
