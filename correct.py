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


data_corretto = correggi_valore(data)

with open("prova-corretto2.json", "w", encoding="utf-8") as f:
    json.dump(data_corretto, f, ensure_ascii=False, indent=4)

print("✔️ Correzione completata: creato 'prova-corretto2.json'")
