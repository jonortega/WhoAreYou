export { fetchJSON };

async function fetchJSON(file) {

    return await fetch(file).then(r => r.json())

}
