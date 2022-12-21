import { lower, stringToHTML, higher, headless, toggle } from "./fragments.js";
import { initState } from "./stats.js";
import { updateStats } from "./stats.js";
import { stats } from "./fragments.js";

// YOUR CODE HERE :  
// .... stringToHTML ....
// .... setupRows .....
function pad(a, b) {
    return (1e15 + a + '').slice(-b);
}


const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']
let interval


export let setupRows = function (game) {

    let [state, updateState] = initState('WAYgameState', game.solution.id)

    function leagueToFlag(leagueId) {
        let flags = [{ 'id': 564, 'nombre': 'es1' }, { 'id': 8, 'nombre': 'en1' }, { 'id': 82, 'nombre': 'de1' }, { 'id': 384, 'nombre': 'it1' }, { 'id': 301, 'nombre': 'fr1' }]
        return flags.filter(e => e.id == leagueId)[0].nombre
    }

    function getAge(dateString) {
        let birthday_date = new Date(dateString);
        let ageDifMs = Date.now() - birthday_date.getTime();
        let ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    let check = function (theKey, theValue) {
        if (theKey == 'birthdate') {
            if (theValue == game.solution.birthdate) {
                return 'correct'
            } else {
                if (getAge(theValue) > getAge(game.solution.birthdate)) {
                    return 'lower'
                } else {
                    return 'higher'
                }
            }
        } else {
            if (game.solution[theKey] == theValue) {
                return 'correct'
            } else {
                return 'incorrect'
            }
        }
    }

    function msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return (hrs - 1) + ':' + mins + ':' + secs;
    }


    function unblur(outcome) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                document.getElementById("mistery").classList.remove("hue-rotate-180", "blur")
                document.getElementById("combobox").remove()
                let color, text
                if (outcome == 'success') {
                    color = "bg-blue-500"
                    text = "Awesome"
                } else {
                    color = "bg-rose-500"
                    text = "The player was " + game.solution.name
                }
                document.getElementById("picbox").innerHTML += `<div class="animate-pulse fixed z-20 top-14 left-1/2 transform -translate-x-1/2 max-w-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${color} text-white"><div class="p-4"><p class="text-sm text-center font-medium">${text}</p></div></div>`
                resolve();
            }, "2000")
        })
    }

    function showStats(timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                document.body.appendChild(stringToHTML(headless(stats())));
                document.getElementById("showHide").onclick = toggle;
                bindClose();
                resolve();
            }, timeout)
        })
    }

    function bindClose() {
        document.getElementById("closedialog").onclick = function () {
            document.body.removeChild(document.body.lastChild)
            document.getElementById("mistery").classList.remove("hue-rotate-180", "blur")
            clearInterval(interval)
        }
    }

    function success(timeout) {
        unblur('success')
        showStats(timeout)
    }

    function gameOver(timeout) {
        unblur('gameOver')
        showStats(timeout)
    }

    function setContent(guess) {
        return [
            `<img src="https://jortega.eus/images/nationalities/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://jortega.eus/images/leagues/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://jortega.eus/images/teams/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}${check('birthdate', guess.birthdate) == 'higher' ? stringToHTML(higher).innerHTML : check('birthdate', guess.birthdate) == 'lower' ? stringToHTML(lower).innerHTML : ''}`,
        ]
    }

    function showContent(content, guess) {
        let fragments = '', s = '';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms")
            fragments += `<div class="w-1/5 shrink-0 flex justify-center ">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                            </div>
                         </div>`
        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}`

        let playersNode = document.getElementById('players')
        playersNode.prepend(stringToHTML(child))
    }

    function resetInput() {
        let texto = document.getElementById('myInput')
        texto.value = ''
        if (game.guesses.length < 8) {
            texto.placeholder = 'Guess ' + (game.guesses.length + 1) + ' of 8'
        }

    }

    let getPlayer = function (playerId) {
        return game.players.filter(e => e.id == playerId)[0]
    }

    function gameEnded(lastGuess) {
        if (game.guesses.length >= 8 || lastGuess == game.solution.id) {
            return true;
        } else { return false }
    }

    resetInput();

    return /* addRow */ function (playerId) {
        let guess = getPlayer(playerId)
        console.log(guess)

        let content = setContent(guess)

        game.guesses.push(playerId)
        updateState(playerId)

        resetInput();

        if (gameEnded(playerId)) {

            interval = setInterval(() => {
                const now = new Date();
                let formattedDate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + (now.getDate() + 1)
                const endDate = formattedDate + "T00:00:00.000Z";
                const end = new Date(endDate);
                let nextPlayer = document.getElementById("nextPlayer")
                nextPlayer.textContent = msToTime(Math.abs(now - end))
                return Math.abs(now - end)
            }, 1000)

            if (playerId == game.solution.id) {
                updateStats(game.guesses.length);
                success(interval);
            } else {
                updateStats(game.guesses.length + 1);
                gameOver(interval);
            }

        }


        showContent(content, guess)
    }
}
