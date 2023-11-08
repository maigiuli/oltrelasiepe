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

// Richiamo delle funzioni al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    bounceDuck(); // Chiamata alla funzione per far saltare la papera
    sparkleText(); // Chiamata alla funzione per far brillare il testo
    fallLetters(); // Chiamata alla funzione per far cadere il testo lettera per lettera
});
