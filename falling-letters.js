// Ottieni l'elemento con la classe "falling-text"
const fallingText = document.querySelector('.falling-text');

// Separare la frase in singole lettere
const letters = fallingText.textContent.split('');

// Sostituisci il testo con le lettere separate
fallingText.innerHTML = '';

letters.forEach((letter, index) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.className = 'falling-letter';
    span.style.animationDelay = `${0.1 * index}s`;
    fallingText.appendChild(span);
});

// Rendi visibile il testo e avvia l'animazione
fallingText.style.visibility = 'visible';
