import wikipedia
import json

def aggiungi_descrizione(santi, lang="it"):
    wikipedia.set_lang(lang)
    
    for santo in santi:
        nome = santo.get("nome_santo", "")
        if nome:
            try:
                # prende il primo paragrafo della pagina
                summary = wikipedia.summary(nome, sentences=2)
                santo["descrizione"] = summary
            except Exception as e:
                # se non trova la pagina, lascia vuoto
                santo["descrizione"] = ""
                print(f"⚠️ Non trovato {nome}: {e}")
    return santi

# ==========================
# MAIN SCRIPT
# ==========================
input_file = "prova-corretto3new.json"
output_file = "santi_con_descrizione.json"

with open(input_file, "r", encoding="utf-8") as f:
    santi = json.load(f)

santi = aggiungi_descrizione(santi)

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(santi, f, ensure_ascii=False, indent=4)

print(f"✔️ Descrizioni aggiunte in {output_file}")
