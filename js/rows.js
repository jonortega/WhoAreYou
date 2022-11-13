import { lower, stringToHTML, higher } from "./fragments.js";
import { initState } from "./stats.js";

// YOUR CODE HERE :  
// .... stringToHTML ....
// .... setupRows .....

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']


export let setupRows = function (game) {

    let [state, updateState] = initState('WAYgameState', game.solution.id)
    console.log(state, updateState)

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

    function success() {
        unblur('success')
    }

    function gameOver() {
        unblur('gameOver')
    }

    function setContent(guess) {
        return [
            `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
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
        texto.placeholder = 'Guess ' + game.guesses.length + ' of 8'
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
            // updateStats(game.guesses.length);

            if (playerId == game.solution.id) {
                success();
            }

            if (game.guesses.length == 8) {
                gameOver();
            }
        }


        showContent(content, guess)
    }
}
