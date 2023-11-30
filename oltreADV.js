const btn = document.getElementById('button');
const form = document.getElementById('form');
const mainContainer = document.querySelector('.main');


document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Abbi pazienza...';

   const serviceID = 'service_crrtows';
   const templateID = 'template_7qsh2h8';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Invia';
      showThanksMessage();
      alert('Grazie! Una renna di Babbo Natale consegnerà il tuo messaggio il prima possibile');
      this.reset();
    }, (err) => {
      btn.value = 'Invia';
      alert(JSON.stringify(err));
    });

});


document.getElementById('surveyForm')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Abbi pazienza...';

   const serviceID = 'default_service';
   const templateID = 'template_cj8c12r';
  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Invia';
      showThanksMessage();
      alert('Grazie! Una renna di Babbo Natale consegnerà il tuo messaggio il prima possibile');
      this.reset();
    }, (err) => {
      btn.value = 'Invia';
      alert(JSON.stringify(err));
    });

});



function showThanksMessage() {

    // Crea e aggiungi il messaggio di ringraziamento al corpo del documento
    var thanksContainer = document.createElement('div');
    thanksContainer.id = 'thanksContainer';
    thanksContainer.classList.add('container'); // Aggiungi la classe 'container'
    thanksContainer.innerHTML = '<h2>Grazie!</h2><p>Una renna di Babbo Natale consegnerà il tuo messaggio il prima possibile.</p>';
    
     mainContainer.appendChild(thanksContainer);
}
