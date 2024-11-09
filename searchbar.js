function filterSongs() {
    // Ottieni il valore della barra di ricerca in minuscolo
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    // Ottieni tutti gli elementi delle canzoni
    const songs = document.querySelectorAll(".square");
    let found = false;

    // Itera sui blocchi delle canzoni
    songs.forEach(song => {
        // Cerca l'elemento con classe .square-title
        const titleElement = song.querySelector(".square-title");

        // Se il titolo non è presente, passa al prossimo elemento
        if (!titleElement) return;

        // Ottieni il contenuto del titolo della canzone
        const title = titleElement.textContent.toLowerCase();

        // Controlla se il titolo contiene il termine di ricerca
        if (title.includes(searchTerm)) {
            song.style.display = "block";
            found = true;
        } else {
            song.style.display = "none";
        }
    });

    // Aggiorna il messaggio in base al risultato
    const message = document.getElementById("searchMessage");
    if (found && searchTerm !== "") {
        message.textContent = "Trovata!";
        message.style.color = "green";
    } else if (searchTerm !== "") {
        message.textContent = "Nessuna corrispondenza trovata";
        message.style.color = "red";
    } else {
        message.textContent = "";  // Pulisce il messaggio se non c'è ricerca
    }
}
