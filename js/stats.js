export {initState}

let initState = function(what, solutionId) { 

    let solucion = []
    let lista = localStorage.getItem(what)
    if(lista == null){
        localStorage.setItem(what, {"guesses":[], "solution":solutionId})
        lista = localStorage.getItem(what)
    }
    solucion[0] = lista
    solucion[1] = ((guess) => {
        lista.guesses.push(guess)
        localStorage.setItem(what, lista)
    })

    console.log(solucion)

    return solucion
}