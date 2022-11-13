export {updateStats, getStats, initState}

let initState = function (what, solutionId) {

    let solucion = []
    let lista = localStorage.getItem(what)
    if(lista == null){
        localStorage.setItem(what, JSON.stringify({"guesses":[], "solution":solutionId}))

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

function successRate (e){
    // YOUR CODE HERE
}

let getStats = function(what) {
    let lista = localStorage.getItem(what)
    if(lista == null){
        lista = JSON.stringify({winDistribution: [0,0,0,0,0,0,0,0,0],
            gamesFailed: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalGames: 0,
            successRate: 0
            })
        localStorage.setItem(what, lista)
    }
    return lista
};


function updateStats(t){
    let gameStats = JSON.parse(localStorage.getItem('gameStats'))

};

let gamestats = getStats('gameStats');