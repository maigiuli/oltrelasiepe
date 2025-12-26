import json
import re

# Regex ripetizioni tipo (Paese)|città
pattern_paese = re.compile(r'(\([^()]+\))\|[^,]+(?=,|$)', re.IGNORECASE)

# Regex tag <ref ...>...</ref> e self closing
pattern_ref = re.compile(r'<ref[^>]*>(.*?)<\/ref>|<ref[^>]*/>', re.IGNORECASE | re.DOTALL)

# Regex secolo (numero romano)
roman = r'(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX|XXI)'

def sposta_secolo(diz, campo_luogo, campo_datazione):
    val_luogo = diz.get(campo_luogo, "").strip()
    val_dataz = diz.get(campo_datazione, "").strip()
    
    # caso: luogo = numero romano e datazione = "secolo"
    if re.fullmatch(roman, val_luogo, re.IGNORECASE) and val_dataz.lower() == "secolo":
        diz[campo_luogo] = ""
        diz[campo_datazione] = f"{val_luogo} secolo"
    
    return diz


with open("prova-corretto.json", "r", encoding="utf-8") as f:
    data = json.load(f)

def correggi_valore(v):
    if isinstance(v, str):
        v = pattern_paese.sub(r'\1', v)       # corregge (Paese)|Città
        v = pattern_ref.sub('', v)            # elimina tag ref
        return v.strip()
    elif isinstance(v, dict):
        v = {k: correggi_valore(x) for k, x in v.items()}
        
        # spostamento secolo per nascita
        v = sposta_secolo(v, "luogo_nascita", "datazione nascita")
        
        # spostamento secolo per morte
        v = sposta_secolo(v, "luogo morte", "datazione morte")

        return v
    elif isinstance(v, list):
        return [correggi_valore(x) for x in v]
    return v



def pulisci_note(testo):
    """Rimuove riferimenti tipo [1], [2], ecc."""
    return re.sub(r"\[\d+\]", "", testo).strip()

def sistema_santi(santi):
    for santo in santi:

        # --- PULIZIA NOTE ---
        for k, v in list(santo.items()):
            if isinstance(v, str):
                santo[k] = pulisci_note(v)

        # --- CASO: luogo contiene solo anno o intervallo → sposta in datazione ---
        for campo_luogo, campo_data in [("luogo_nascita", "datazione nascita"),
                                        ("luogo morte", "datazione morte")]:
            valore = santo.get(campo_luogo, "")
            if re.fullmatch(r"\d{1,4}(?:/\d{1,4})?", valore):
                # sposta all’inizio di datazione
                data_corrente = santo.get(campo_data, "").strip()
                santo[campo_data] = (valore + (" " + data_corrente if data_corrente else "")).strip()
                santo[campo_luogo] = ""

        # --- CASO: luogo + anno attaccati (es: Germanicia381) ---
        for campo_luogo, campo_data in [("luogo_nascita", "datazione nascita"),
                                        ("luogo morte", "datazione morte")]:
            valore = santo.get(campo_luogo, "")
            m = re.match(r"([A-Za-zÀ-ÿ\s']+)(\d{3,4}(?:/\d{3,4})?)", valore)
            if m:
                santo[campo_luogo] = m.group(1).strip()
                anni = m.group(2).strip()
                data_corrente = santo.get(campo_data, "").strip()
                santo[campo_data] = (anni + (" " + data_corrente if data_corrente else "")).strip()

        # --- CASO: datazione contiene luogo e anni separati da virgola ---
        dm = santo.get("datazione morte", "")
        if "," in dm:
            parte_luogo, parte_anni = dm.split(",", 1)
            parte_luogo = parte_luogo.strip()
            parte_anni = parte_anni.strip()
            # aggiorna luogo se vuoto o generico
            if santo.get("luogo morte", "") in ["", " ", "Monte"]:
                santo["luogo morte"] = parte_luogo
            santo["datazione morte"] = parte_anni

    return santi




# ==============================
#          MAIN SCRIPT
# ==============================



#data_corretto = correggi_valore(data)

#with open("prova-corretto2.json", "w", encoding="utf-8") as f:
#    json.dump(data_corretto, f, ensure_ascii=False, indent=4)


input_file = "prova-corretto2.json"              # <-- nome del file di input
output_file = "prova-corretto3.json"   # <-- nome del file di output

with open(input_file, "r", encoding="utf-8") as f:
    dati = json.load(f)

dati_sistemati = sistema_santi(dati)

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(dati_sistemati, f, ensure_ascii=False, indent=4)


print("✔️ Correzione completata: creato 'prova-corretto3.json'")
