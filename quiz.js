  
let santi = [];

//fetch("prova-corretto3new.json")
fetch("santi_con_livello.json")
    .then(response => response.json())
    .then(data => {
        santi = data;
        
    })
    .catch(err => console.error("Errore caricamento JSON", err));


const MODALITA = {
    SANTO_DA_IMMAGINE: "santo_da_immagine",
    LUOGO_DA_SANTO: "luogo_da_santo", 
    ATTRIBUTI_DA_SANTO: "attributi_da_santo"
};

// 3. FUNZIONI
function santoCasuale(santi) {
    const index = Math.floor(Math.random() * santi.length);
    return santi[index];
}



function filtraSantiPerModalita(santi, modalita) {
    if (modalita === MODALITA.SANTO_DA_IMMAGINE) {
        return santi.filter(s =>
            s.immagine && s.immagine.trim() !== "" && s.livello.trim() == "F"
        );
    }

    if (modalita === MODALITA.LUOGO_DA_SANTO) {
        return santi.filter(s => s.luogo_nascita && s.luogo_nascita.trim() !== "");
        
    }

    if (modalita === MODALITA.ATTRIBUTI_DA_SANTO) {
        return santi.filter(s => s.attributi && s.attributi.trim() !== "");
    }


    return santi;
}

function domandaSantoDaImmagine(santo) {
    return {
        immagine: santo.immagine,
        domanda: "Chi è questo santo?",
        rispostaCorretta: santo.nome_santo,
        descrizione: santo.descrizione, 
        patrono: santo.patrono, 
        attributi: santo.attributi 
    };
}

function domandaLuogoDaSanto(santo) {
    return {
        immagine: santo.immagine,
        domanda: `Da dove proviene ${santo.nome_santo}?`,
        rispostaCorretta: santo.luogo_nascita,
        descrizione: santo.descrizione, 
        patrono: santo.patrono,
        attributi: santo.attributi
    };
}

function domandaAttributiDaSanto(santo) {
    return {
        immagine: santo.immagine,
        domanda: `Quali sono gli attributi di ${santo.nome_santo}?`,
        rispostaCorretta: santo["attributi"],
        descrizione: santo.descrizione,
        patrono: santo.patrono,
        attributi: santo.attributi
    };
}




// 4. AVVIO QUIZ
function nuovaDomanda(santi, modalita) {
    const santiFiltrati = filtraSantiPerModalita(santi, modalita);

    if (santiFiltrati.length === 0) {
        alert("Nessun santo disponibile per questa modalità");
        return null;
    }

    const santo = santoCasuale(santiFiltrati);

    if (modalita === MODALITA.SANTO_DA_IMMAGINE) {
        return domandaSantoDaImmagine(santo);
    }

    if (modalita === MODALITA.LUOGO_DA_SANTO) {
        return domandaLuogoDaSanto(santo);
    }

    if (modalita === MODALITA.ATTRIBUTI_DA_SANTO) {
        return domandaAttributiDaSanto(santo);
    }
}



// === TEST QUIZ BASE ===

function mescolaArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


function generaOpzioni(santi, rispostaCorretta, modalita) {
    let filtrati = filtraSantiPerModalita(santi, modalita); 

    if (modalita === MODALITA.SANTO_DA_IMMAGINE) {
        possibili = filtrati.map(s => s.nome_santo);
    }

    if (modalita === MODALITA.LUOGO_DA_SANTO) {
        possibili = filtrati.map(s => s.luogo_nascita);
    }
    if (modalita === MODALITA.ATTRIBUTI_DA_SANTO) {
        possibili = filtrati.map(s => s.attributi);
    }

    const altre = possibili.filter(v => v !== rispostaCorretta);

    const opzioni = [
        rispostaCorretta,
        ...mescolaArray(altre).slice(0, 3)
    ];

    return mescolaArray(opzioni);
}

function getModalitaSelezionata() {
    const selected = document.querySelector('input[name="modalita"]:checked');
    return selected ? selected.value : MODALITA.SANTO_DA_IMMAGINE;
}



let domandaCorrente = null;
let numeroDomanda = 0;
let totaleDomande = 10; // default
let risultati = [];
function getNumeroDomandeSelezionato() {
    const selected = document.querySelector('input[name="numDomande"]:checked');
    return selected ? parseInt(selected.value) : 10;
}

function avviaQuiz() {
    if (numeroDomanda >= totaleDomande) {
        fineQuiz();
        return;
    }

    numeroDomanda++;
    const modalita = getModalitaSelezionata();

    domandaCorrente = nuovaDomanda(santi, modalita);

    document.getElementById("domanda").innerText = domandaCorrente.domanda;

    const img = document.getElementById("immagine");

    if (domandaCorrente.immagine) {
        img.src = domandaCorrente.immagine;
        img.style.display = "block";
    } else {
        img.style.display = "none";
    }

    document.getElementById("feedback").innerText = "";
    document.getElementById("descrizione").innerText = ""; 
    document.getElementById("patrono").innerHTML = ""; 
    document.getElementById("attributi").innerHTML = "";
    document.getElementById("nextBtn").disabled = true;

    const opzioni = generaOpzioni(santi, domandaCorrente.rispostaCorretta, modalita);
    mostraOpzioni(opzioni);
    document.getElementById("contatore").innerText =
        `Domanda ${numeroDomanda} di ${totaleDomande}`;
   


}


function mostraOpzioni(opzioni) {
    const container = document.getElementById("opzioni");
    container.innerHTML = "";

    opzioni.forEach(opzione => {
        const btn = document.createElement("button");
        btn.innerText = opzione;
        btn.onclick = () => verificaRisposta(opzione);
        container.appendChild(btn);
    });
}

function verificaRisposta(rispostaUtente) {
    const feedback = document.getElementById("feedback");
    const descrizione = document.getElementById("descrizione");
    const patrono = document.getElementById("patrono");
    const attributi = document.getElementById("attributi");
    const buttons = document.querySelectorAll("#opzioni button");

    buttons.forEach(btn => {
        btn.disabled = true;

        if (btn.innerText === domandaCorrente.rispostaCorretta) {
            btn.classList.add("corretto");
        }

        if (btn.innerText === rispostaUtente && rispostaUtente !== domandaCorrente.rispostaCorretta) {
            btn.classList.add("sbagliato");
        }
    });

    if (rispostaUtente === domandaCorrente.rispostaCorretta) {
        feedback.innerText = "✅ Risposta corretta!";
    } else {
        feedback.innerText = `❌ Sbagliato! Risposta giusta: ${domandaCorrente.rispostaCorretta}`;
    }

    descrizione.innerText = domandaCorrente.descrizione;
    if (patrono && domandaCorrente.patrono) {
        patrono.innerHTML = "<strong>Patrono:</strong> " + domandaCorrente.patrono;
    } else if (patrono) {
        patrono.innerHTML = "";
    }
    if (attributi && domandaCorrente.attributi) {
        attributi.innerHTML = "<strong>Attributi:</strong> " + domandaCorrente.attributi;
    } else if (patrono) {
        attributi.innerHTML = "";
    }


    document.getElementById("nextBtn").disabled = false;
    risultati.push({
        domanda: domandaCorrente.domanda,
        rispostaUtente: rispostaUtente,
        rispostaCorretta: domandaCorrente.rispostaCorretta,
        corretta: rispostaUtente === domandaCorrente.rispostaCorretta
    });
}

function prossimaDomanda() {
    document.getElementById("feedback").innerText = "";
    document.getElementById("descrizione").innerText = "";
    document.getElementById("nextBtn").disabled = true;

    avviaQuiz();
}

function disabilitaOpzioni() {
    const buttons = document.querySelectorAll("#opzioni button");
    buttons.forEach(btn => btn.disabled = true);
}



function iniziaQuiz() {
    numeroDomanda = 0;
    risultati = [];

    document.getElementById("wrapperModalita").style.display = "none";
    document.getElementById("wrapperQuiz").style.display = "flex";

    avviaQuiz();
}
function ricominciaQuiz() {
    // Nascondi risultati
    document.getElementById("risultatiFinali").style.display = "none";

    // Mostra la prima schermata: scelta numero domande
    document.getElementById("wrapperNumeroDomande").style.display = "flex";

    // Nascondi tutte le altre sezioni
    document.getElementById("wrapperModalita").style.display = "none";
    document.getElementById("wrapperQuiz").style.display = "none";

    // Reset variabili
    numeroDomanda = 0;
    totaleDomande = 10; // default
    risultati = [];
}



function vaiASceltaModalita() {
    totaleDomande = getNumeroDomandeSelezionato();

    document.getElementById("wrapperNumeroDomande").style.display = "none";
    document.getElementById("wrapperModalita").style.display = "flex";
}

function fineQuiz() {
    document.getElementById("wrapperQuiz").style.display = "none";

    const risultatiDiv = document.getElementById("risultatiFinali");
    risultatiDiv.style.display = "block";

    const lista = document.getElementById("listaRisultati");
    lista.innerHTML = "";

    let corrette = 0;

    risultati.forEach((r, index) => {
        if (r.corretta) corrette++;
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${index + 1}. ${r.domanda}</strong><br>
            Tua risposta: ${r.rispostaUtente}<br>
            Risposta corretta: ${r.rispostaCorretta}
            ${r.corretta ? "✅" : "❌"}
        `;
        lista.appendChild(li);
    });

    document.getElementById("punteggioFinale").innerText =
        `Hai risposto correttamente a ${corrette} su ${totaleDomande} domande`;
}
