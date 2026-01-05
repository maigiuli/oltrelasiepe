import json

INPUT_FILE = "prova-corretto3new.json"
OUTPUT_FILE = "santi_con_livello.json"

def chiedi_livello(nome):
    while True:
        livello = input(f"Inserisci livello per '{nome}' (F/M/D): ").strip().upper()
        if livello in ["F", "M", "D"]:
            return livello
        print("Valore non valido. Usa solo F, M o D.")

def main():
    # Legge il file di input
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        santi = json.load(f)

    # Scansione dei santi
    for santo in santi[:]:
        nome = santo.get("nome_santo", "Santo senza nome")
        #livello = chiedi_livello(nome)
        santo["livello"] = "D"

    # Scrive il nuovo file
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(santi, f, ensure_ascii=False, indent=4)

    print(f"\nFile generato con successo: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
