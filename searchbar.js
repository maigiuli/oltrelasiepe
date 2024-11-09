function filterSongs() {
    // Ottieni il valore della barra di ricerca e convertilo in minuscolo
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();

    // Ottieni tutti gli elementi delle canzoni
    const songs = document.querySelectorAll(" .square");

    // Itera tra le canzoni e mostra/nascondi in base alla ricerca
    songs.forEach(song => {
        const title = song.querySelector("square-title").textContent.toLowerCase();

        // Se il titolo contiene il termine di ricerca, mostra la canzone; altrimenti, nascondila
        if (title.includes(searchTerm)) {
            song.style.display = "block";
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