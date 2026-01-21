function filterSongs() {
    // Ottieni il valore della barra di ricerca in minuscolo
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    // Ottieni tutti gli elementi delle canzoni
    const songs = document.querySelectorAll(".square");
    let found = false;

    songs.forEach(song => {
        const titleElement = song.querySelector(".square-title");   
        const artistElement = song.querySelector(".square-description");

        // Controlla che entrambi gli elementi esistano
        if (!titleElement || !artistElement) return;

        // Ottieni il testo del titolo e del cantante
        const title = titleElement.textContent.toLowerCase();
        const artist = artistElement.textContent.toLowerCase();

        // Controlla se il titolo o il cantante contengono il termine di ricerca
        if (title.includes(searchTerm) || artist.includes(searchTerm)) {
            song.style.display = "block"; // Mostra il blocco se corrisponde
            found = true;
        } else {
            song.style.display = "none"; // Nasconde il blocco se non corrisponde
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
