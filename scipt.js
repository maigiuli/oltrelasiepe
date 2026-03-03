
fetch('sanremo_db.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(festivalData => {
        console.log(festivalData);

        const container = document.getElementById('buttons-container');
        const imageElement = document.getElementById('year-image');

        for (const year in festivalData) {
            const data = festivalData[year];

            const btn = document.createElement('button');
            btn.classList.add('year-button');

            const img = document.createElement('img');
            img.src = data.logo;
            img.alt = `Logo Sanremo ${year}`;
            img.classList.add('button-logo');
            const span = document.createElement('span');
            span.textContent = year;

            btn.appendChild(img);
            btn.appendChild(span);


            btn.addEventListener('click', () => {
                const data = festivalData[year];
                imageElement.src = data.logo;
                imageElement.alt = `Logo Festival di Sanremo ${year}`;
                localStorage.setItem('selectedYear', year);
                window.location.href = 'dettagli.html';
            });


            container.appendChild(btn);
        }
    })
    .catch(error => console.error('Errore nel caricamento del JSON:', error));
