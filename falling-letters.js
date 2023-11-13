function fallLetters() {
    const textElement = document.querySelector('.falling-text');
    const text = textElement.textContent;
    textElement.textContent = '';

    for (let i = 0; i < text.length; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = text[i];
        letterSpan.style.animationDelay = `${i * 0.1}s`;
        textElement.appendChild(letterSpan);
    }
}

function bounceDuck() {
            const duck = document.getElementById('logo');
            duck.classList.add('bouncing');
            setTimeout(() => {
                duck.classList.remove('bouncing');
            }, 500);
        }

function sparkText() {
            const text = document.querySelector('.text1');
            text.classList.add('sparkable');
            setTimeout(() => {
                text.classList.remove('sparkable');
            }, 1000);
}

// Richiamo delle funzioni al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    sparkleText(); // Chiamata alla funzione per far brillare il testo
    fallLetters(); // Chiamata alla funzione per far cadere il testo lettera per lettera
});
