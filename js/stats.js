export { initState }

let initState = function (what, solutionId) {

    let solucion = []
    let lista = localStorage.getItem(what)
    console.log(lista)
    if (lista == null) {
        localStorage.setItem(what, JSON.stringify({ "guesses": [], "solution": solutionId }))
        lista = localStorage.getItem(what)
    }
    solucion[0] = lista
    solucion[1] = ((guess) => {
        let lista = JSON.parse(localStorage.getItem('WAYgameState'))
        console.log(lista.guesses)
        lista.guesses.push(guess)
        localStorage.setItem('WAYgameState', JSON.stringify(lista))
    })

    console.log(solucion)

    return solucion
}   