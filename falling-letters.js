function fallLetters() {
   const textElement = document.getElementById('falling-text');
    const text = textElement.textContent;
    textElement.textContent = '';

    for (let i = 0; i < text.length; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = text[i];
        letterSpan.style.animationDelay = `${i * 0.1}s`;
        textElement.appendChild(letterSpan);
    }
}

fallLetters(); 

function bounceDuck() {
            const duck = document.getElementById('logo');
            duck.classList.add('bouncing');
            setTimeout(() => {
                duck.classList.remove('bouncing');
            }, 500);
        }

function sparkText() {
            const text = document.getElementById('textspark');
            text.classList.add('sparkable');
            setTimeout(() => {
                text.classList.remove('sparkable');
            }, 1000);
}

 function startAudio() {
            var audio = document.getElementById('myAudio');
            audio.play();
        }
 function toggleAudio() {
            var audio = document.getElementById('myAudio');
             if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
}

function image(){
    const articles = document.querySelectorAll('.article-link');

articles.forEach(article => {
    article.addEventListener('mouseenter', () => {
        const img = article.querySelector('img');
        img.style.transform = 'scale(1.1)';
    });

    article.addEventListener('mouseleave', () => {
        const img = article.querySelector('img');
        img.style.transform = 'scale(1)';
    });
});
}
