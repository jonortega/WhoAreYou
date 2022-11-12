import { folder, leftArrow } from "./fragments.js";
import { fetchJSON } from "./loaders.js";
import { setupRows } from "./rows.js";


function differenceInDays(base) {
    let fecha = Date.now()
    let hoy = new Date(fecha)
    return Math.floor(Math.abs(hoy - base) / (1000 * 3600 * 24)) % 39
    // mod 39 es para que el numero salga entre 0-39 porque el array solutions solo tiene 39 elementos
    // y si no daba error al ejecutar porque salen numeros mas grandes (0-365)
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
    let jugadorHoy = players.filter(player => player.id == idJugadorHoy.id)[0]
    return jugadorHoy
}

Promise.all([fetchJSON("json/fullplayers.json"), fetchJSON("json/solution.json")]).then(
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
        let texto = document.getElementById("myInput")
        // when the user types a number an press the Enter key:
        texto.addEventListener("keydown", e => {
            if (e.keyCode == 13){
                addRow(texto.textContent);
            }
            
        //
        })
          


    }
);
