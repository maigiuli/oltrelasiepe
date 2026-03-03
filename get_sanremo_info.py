import requests
from bs4 import BeautifulSoup
import json
import time

def get_image_from_wiki(page_url):

    headers = {
        'User-Agent': 'SanremoQuizBot/1.0 (contatto: maineri.giulia@gmail.com) Mozilla/5.0'
    }
    
    try:
        res = requests.get(page_url, headers=headers)
        print(res)

        if res.status_code == 200:
            soup = BeautifulSoup(res.text, 'html.parser')
            infobox = soup.find('table', class_='infobox sinottico')
            print(infobox)
            if infobox:
                img = infobox.find('img')
                if img:
                    src = img['src']
                    print(src)
                    return "https:" + src if src.startswith('//') else src
        else:
            print(f"Errore {res.status_code} su {page_url}")
    except Exception as e:
        print(f"Errore durante il recupero immagine: {e}")
    return None

def scrape_sanremo_edition(year):
    url = f"https://it.wikipedia.org/wiki/Festival_di_Sanremo_{year}"
    print(f"--- Find data for {year=} ---")
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    response = requests.get(url, headers=headers)
 

    if response.status_code != 200:
        print(f"Page not found {year}")
        return None

    soup = BeautifulSoup(response.text, 'html.parser')
    
    data = {
        "year": year,
        "logo": "",
        "presenter": [],
        "artistic director": [],
        "participants": []
    }

    infobox = soup.find('table', class_='sinottico')
    if infobox and infobox.find('img'):
        data["logo"] = "https:" + infobox.find('img')['src']


    if infobox:
        rows = infobox.find_all('tr')
        for row in rows:
            if "Presentatore" in row.get_text():
                conduttori = [a.get_text() for a in row.find_all('a') if not a.get_text().startswith('[')]
                data["presenter"] = conduttori
            
            if "Direttore artistico" in row.get_text():
                direttore = [a.get_text() for a in row.find_all('a') if not a.get_text().startswith('[')]
                data["artistic director"] = direttore

    
    for header in soup.find_all('h2'):
        print(header.get_text())
        if 'Classifica' in header.get_text() or 'classifica' in header.get_text():
            tabella = header.find_next('table', class_='wikitable')
            break

    if tabella:
        posizione_corrente = ""
        for row in tabella.find_all('tr')[1:]:
            cols = row.find_all(['td', 'th'])
            if cols[0].has_attr('rowspan'):
                posizione_corrente = cols[0].get_text().strip()
                # In questa riga, i dati iniziano dall'indice 1
                idx_artista = 1
                idx_canzone = 2
            elif len(cols) < 5: # Numero di colonne totali della tabella (es. 5)
                # È una riga "figlia" (senza la colonna posizione)
                # I dati iniziano dall'indice 0
                idx_artista = 0
                idx_canzone = 1
            else:
                # È una riga normale senza rowspan (es. le prime 4 posizioni)
                posizione_corrente = cols[0].get_text().strip()
                idx_artista = 1
                idx_canzone = 2

            link_tag = cols[idx_artista].find('a')
            nome_artista = cols[idx_artista].get_text().strip()
            titolo_canzone = cols[idx_canzone].get_text().strip().replace('"', '')
            print(nome_artista)
            print(idx_artista)
                
            foto_url = None
            if link_tag and link_tag.get('href'):

                foto_url = get_image_from_wiki("https:" + link_tag['href'])
            
            data["participants"].append({
                "artist": nome_artista,
                "song": titolo_canzone,
                "picture_artist": foto_url, 
                "position": posizione_corrente
            })
                
    return data


def run_scraper(start, end):
    with open('sanremo_db.json', 'r', encoding='utf-8') as f:
        all_data = json.load(f)
    for y in range(start, end + 1):
        if str(y) in all_data:
            print("skip" + str(y))
            continue
        year_info = scrape_sanremo_edition(y)
        if year_info:
            all_data[y] = year_info
        time.sleep(1) 
    
    with open('sanremo_db.json', 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=4)
    print("\nFile 'sanremo_db.json' created!")


run_scraper(2006, 2006)