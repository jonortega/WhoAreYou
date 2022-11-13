export { updateStats, getStats, initState }

let initState = function (what, solutionId) {

    let solucion = []
    let lista = localStorage.getItem(what)
    if (lista == null) {
        localStorage.setItem(what, JSON.stringify({ "guesses": [], "solution": solutionId }))

        lista = localStorage.getItem(what)
    }
    solucion[0] = lista
    solucion[1] = ((guess) => {
        let lista = JSON.parse(localStorage.getItem(what))
        console.log(lista.guesses)
        lista.guesses.push(guess)
        localStorage.setItem(what, JSON.stringify(lista))
    })
    return solucion
}

function successRate(e) {
    return ((e.totalGames - e.gamesFailed) / e.totalGames) * 100
}

let getStats = function (what) {
    let lista = localStorage.getItem(what)
    if (lista == null) {
        lista = JSON.stringify({
            totalGames: 0,
            bestStreak: 0,
            currentStreak: 0,
            successRate: 0,
            gamesFailed: 0,
            winDistribution: [0, 0, 0, 0, 0, 0, 0, 0]
        })
        localStorage.setItem(what, lista)
    }
    return JSON.parse(lista)
};


function updateStats(t) {
    console.log(t)
    let gameStats = JSON.parse(localStorage.getItem('gameStats'))
    gameStats.totalGames++
    if (t <= 8) {
        gameStats.winDistribution[t - 1]++
        gameStats.currentStreak++
        if (gameStats.currentStreak > gameStats.bestStreak) {
            gameStats.bestStreak = gameStats.currentStreak
        }
    } else {
        gameStats.gamesFailed++
        gameStats.currentStreak = 0
    }
    gameStats.successRate = successRate(gameStats)

    localStorage.setItem("gameStats", JSON.stringify(gameStats))

};

let gamestats = getStats('gameStats');


