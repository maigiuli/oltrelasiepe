const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Abbi pazienza...';

   const serviceID = 'default_service';
   const templateID = 'template_rpin03f';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Invia Consiglio';
      showThanksMessage();
      alert('Consiglio inviato, grazie!');
    }, (err) => {
      btn.value = 'Invia Consiglio';
      alert(JSON.stringify(err));
    });
});

function showThanksMessage() {
    // Nascondi il modulo del form
    var formContainer = document.querySelector('.container');
    formContainer.style.display = 'none';

    // Mostra il messaggio di ringraziamento
    var thanksContainer = document.createElement('div');
    thanksContainer.innerHTML = '<h2>Grazie!</h2><p>Il tuo suggerimento è stato inviato con successo.</p>';
    document.body.appendChild(thanksContainer);
}
