
emailjs.init("user_0Fzharw2Fcn0pLrCK");

// Funzione per inviare il suggerimento
function sendSuggestion() {
    // Ottieni i valori dai campi di input
    var bookTitle = document.getElementById("bookTitle").value;
    var email = document.getElementById("email").value;

    // Costruisci l'oggetto dei parametri per il template di Email.js
    var templateParams = {
        book_title: bookTitle,
        user_email: email
    };

    // Invia la richiesta di invio dell'email
    emailjs.send("service_dm4zvhg", "template_rpin03f", templateParams)
        .then(function(response) {
            console.log("Success", response);
            // Puoi aggiungere qui altre azioni dopo l'invio
        }, function(error) {
            console.log("Failed", error);
            // Puoi gestire gli errori qui, ad esempio mostrare un messaggio all'utente
        });
}
