import { stringToHTML } from "./fragments.js";

// YOUR CODE HERE :  
// .... stringToHTML ....
// .... setupRows .....

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']


export let setupRows = function (game) {


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

    function setContent(guess) {
        return [
            `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}`
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

    let getPlayer = function (playerId) {
        return game.players.filter(e => e.id == playerId)[0]
    }

    return /* addRow */ function (playerId) {
        let guess = getPlayer(playerId)
        console.log("guess: ", guess)

        let content = setContent(guess)
        showContent(content, guess)
    }
}
