function filterSongs() {
    // Ottieni il valore della barra di ricerca in minuscolo
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    // Ottieni tutti gli elementi delle canzoni
    const songs = document.querySelectorAll(".square");
    let found = false;

    // Itera sui blocchi delle canzoni
    songs.forEach(song => {
        const title = song.querySelector(".square-title").textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            song.style.display = "block";
            found = true;
        } else {
            song.style.display = "none";
        }
    });
    
    const message = document.getElementById("searchMessage");
    if (found && searchTerm !== "") {
        message.textContent = "Trovata!";
    } else if (searchTerm !== "") {
        message.textContent = "Non c'è! Contattami per suggerirmela!";
    } else {
        message.textContent = "";  // Pulisce il messaggio se non c'è ricerca
    }
}