const year = localStorage.getItem('selectedYear');

fetch('sanremo_db.json')
    .then(response => response.json())
    .then(data => {
        const festival = data[year];

        document.getElementById('title').textContent =
            `Festival di Sanremo ${year}`;

        const tbody = document.getElementById('table-body');

        festival.participants.forEach(p => {
            const tr = document.createElement('tr');

            // ARTISTA (visibile)
            const tdArtista = document.createElement('td');

            const img = document.createElement('img');
            img.src = p.picture_artist;
            img.classList.add('artist-img');

            const name = document.createElement('span');
            name.textContent = p.artist;
            name.classList.add('artist-name');

            tdArtista.appendChild(img);
            tdArtista.appendChild(name);

            // CANZONE (da indovinare)
            const tdCanzone = document.createElement('td');

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Indovina la canzone';

            const result = document.createElement('span');

            input.addEventListener('keyup', () => {
                if (
                    input.value.trim().toLowerCase() ===
                    p.song.toLowerCase()
                ) {
                    result.textContent = p.song;
                    result.style.color = 'blue';
                    input.remove();
                }
            });

            tdCanzone.appendChild(input);
            tdCanzone.appendChild(result);

            tr.appendChild(tdArtista);
            tr.appendChild(tdCanzone);

            tbody.appendChild(tr);
        });
    });
