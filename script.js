
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
   emailjs.send("YOUR_EMAILJS_SERVICE_ID", "YOUR_EMAILJS_TEMPLATE_ID", templateParams)
        .then(function(response) {
            console.log("Success", response);
            showThanksMessage(); // Chiamiamo la funzione per mostrare il messaggio "Grazie!"
        }, function(error) {
            console.log("Failed", error);
        });
}

function showThanksMessage() {
    // Nascondi il modulo del form
    var formContainer = document.querySelector('.container');
    formContainer.style.display = 'none';

    // Mostra il messaggio di ringraziamento
    var thanksContainer = document.createElement('div');
    thanksContainer.innerHTML = '<h2>Grazie!</h2><p>Il tuo suggerimento è stato inviato con successo.</p>';
    document.body.appendChild(thanksContainer);
}
