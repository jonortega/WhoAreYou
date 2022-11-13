import { setupRows } from "./rows.js";
export { autocomplete }
import { fetchJSON } from "./loaders.js";
// export { autocomplete, higher, lower }

// ! Me dice que no se esperaba el "<" de al principio de "<svg"
/*
const higher = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" aria-hidden="true" width="25" style="margin-right: -8px; margin-left: -3px;">
    <path fill-rule="evenodd" d="M5.293 7.707a1 1 0010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 10 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
</svg>;

const lower = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" aria-hidden="true" width="25" style="margin-right: -8px; margin-left: -3px;">
    <path fill-rule="evenodd" d="M14.707 12.293a1 1 0010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a11 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
</svg>;
*/

function autocomplete(inp, game) {

    let addRow = setupRows(game);

    let players = game.players;

    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        let a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -2;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < players.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (players[i].name.toUpperCase().startsWith(val.toUpperCase())) {

                b = document.createElement("DIV");
                b.classList.add('flex', 'items-start', 'gap-x-3', 'leading-tight', 'uppercase', 'text-sm');
                b.innerHTML = `<img src="https://cdn.sportmonks.com/images/soccer/teams/${players[i].teamId % 32}/${players[i].teamId}.png"  width="28" height="28">`;

                /*make the matching letters bold:*/
                b.innerHTML += `<div class='self-center'>
                                    <span class='font-bold'>${val.toUpperCase()}</span><span class>${players[i].name.toUpperCase().split(val.toUpperCase())[1]}</span>
                                    <input type='hidden' name='name' value='${players[i].name}'>
                                    <input type='hidden' name='id' value='${players[i].id}'>
                                </div>`;

                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;

                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();

                    let seleccionado = players.filter(e => e.name==inp.value)

                    console.log(seleccionado[0].id)

                    addRow(seleccionado[0].id) // ! No se si es ese parametro, da error porque es "undefined"
                });
                a.appendChild(b);
            }
        }
    });

    inp.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus += 2;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus -= 2;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    // players.find ( p => { return p.id == 47323 })

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active", "bg-slate-200", "pointer");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active", "bg-slate-200", "pointer");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}



